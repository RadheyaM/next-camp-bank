import clientPromise from "../../../../../lib/db"

const handler = async(req, res) => {
    const camperId = req.query.camperCode;
    const client = await clientPromise
    const db = client.db("Campers");
    const trans = db.collection("Transactions");
    const camperTrans = await trans.find({ accountId: camperId }).toArray();
    const data = JSON.parse(JSON.stringify(camperTrans));
    res.status(200).json({data: data})
}

export default handler;