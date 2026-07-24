import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check server-side session authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Please sign in." });
  }

  const { camperId, accountQRCode, linkedQRCode } = req.body;

  if (!camperId) {
    return res.status(400).json({ message: "Camper ID is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Campers");
    const camperDetailsCol = db.collection("CamperDetails");
    const campersCol = db.collection("Campers"); // Banking accounts

    // 1. Find the camper detail record
    let camperObjId;
    try {
      camperObjId = new ObjectId(camperId);
    } catch (e) {
      return res.status(400).json({ message: "Invalid Camper ID format" });
    }

    const camper = await camperDetailsCol.findOne({ _id: camperObjId });
    if (!camper) {
      return res.status(404).json({ message: "Camper not found" });
    }

    // Clean codes
    const newAccountQR = (accountQRCode || "").toString().trim();
    const newLinkedQR = (linkedQRCode || "").toString().trim();

    // 2. Helper validation function for range 10001 to 10375
    const isValidAccountCode = (code) => {
      if (!code) return true; // Empty is fine (blank code)
      const num = parseInt(code, 10);
      return !isNaN(num) && num >= 10001 && num <= 10375 && num.toString() === code;
    };

    if (!isValidAccountCode(newAccountQR)) {
      return res.status(400).json({ message: "Primary Account QR Code must be between 10001 and 10375" });
    }

    if (!isValidAccountCode(newLinkedQR)) {
      return res.status(400).json({ message: "Linked Account QR Code must be between 10001 and 10375" });
    }

    // 3. Uniqueness check for Account QR Code (Primary QR must be unique)
    if (newAccountQR !== "") {
      const existingCamperWithQR = await camperDetailsCol.findOne({
        _id: { $ne: camperObjId },
        accountQRCode: newAccountQR
      });
      if (existingCamperWithQR) {
        const otherName = `${existingCamperWithQR.firstName || ""} ${existingCamperWithQR.lastName || ""}`.trim() || "Another camper";
        return res.status(400).json({
          message: `Account QR Code ${newAccountQR} is already assigned to ${otherName}.`
        });
      }
    }

    // 3b. Linked account validation (cannot link unless target is an active primary account for another camper)
    if (newLinkedQR !== "") {
      const primaryAccountCamper = await camperDetailsCol.findOne({
        accountQRCode: newLinkedQR,
        _id: { $ne: camperObjId }
      });
      if (!primaryAccountCamper) {
        return res.status(400).json({
          message: `Linked Account QR Code ${newLinkedQR} is not assigned as a primary account for any camper.`
        });
      }
      if (primaryAccountCamper.linkedQRCode && primaryAccountCamper.linkedQRCode.trim() !== "") {
        return res.status(400).json({
          message: `Linked Account QR Code ${newLinkedQR} is a secondary account. You can only link to a primary account.`
        });
      }
    }

    // 4. Update the CamperDetails record
    const oldAccountQR = (camper.accountQRCode || "").toString().trim();
    
    await camperDetailsCol.updateOne(
      { _id: camperObjId },
      {
        $set: {
          accountQRCode: newAccountQR,
          linkedQRCode: newLinkedQR,
          dateTimeUpdated: new Date()
        }
      }
    );

    // 5. Sync names in the bank "Campers" (accounts) collection
    const camperFirstName = camper.firstName || "";
    const camperLastName = camper.lastName || "";

    // Case A: The Primary Account QR Code changed
    if (oldAccountQR !== newAccountQR) {
      // Revert the old banking account back to empty strings
      if (oldAccountQR !== "") {
        await campersCol.updateOne(
          { accountId: oldAccountQR },
          {
            $set: {
              firstName: "",
              lastName: "",
              dateTimeUpdated: new Date()
            }
          }
        );
        console.log(`Reset banking account ${oldAccountQR} name to empty strings`);
      }

      // Sync name to the new banking account
      if (newAccountQR !== "") {
        await campersCol.updateOne(
          { accountId: newAccountQR },
          {
            $set: {
              firstName: camperFirstName,
              lastName: camperLastName,
              dateTimeUpdated: new Date()
            }
          }
        );
        console.log(`Synced name ${camperFirstName} ${camperLastName} to banking account ${newAccountQR}`);
      }
    } else if (newAccountQR !== "") {
      // Case B: Same QR, just ensuring name sync
      await campersCol.updateOne(
        { accountId: newAccountQR },
        {
          $set: {
            firstName: camperFirstName,
            lastName: camperLastName,
            dateTimeUpdated: new Date()
          }
        }
      );
      console.log(`Updated/Refreshed name sync for banking account ${newAccountQR}`);
    }

    res.status(200).json({
      message: `Successfully assigned QR Codes for ${camperFirstName} ${camperLastName}!`,
      data: {
        firstName: camperFirstName,
        lastName: camperLastName,
        accountQRCode: newAccountQR,
        linkedQRCode: newLinkedQR
      }
    });

  } catch (error) {
    console.error("Error in assign-qr api:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
