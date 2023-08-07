import AdminNav from "@/components/admin/AdminNav"
import NewUserForm from "@/components/forms/NewUserForm";
import s from "../index.module.css";
import clientPromise from "../../../../lib/db";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const editUserAccounts = ({users}) => {
  console.log("users: ", users)
  return(
    <section className={s.adminSection}>
      <AdminNav/>
      <h1>Manage User Accounts</h1>
      {users.map((user) => {
        return (
        <div className={s.userListDiv}>
          <div className={s.usernameDiv}><strong>{user.email}</strong></div>
          <div className={s.iconBtnDiv}>
            <div className={s.userSubDiv}>
              <IconButton aria-label="delete">
              <EditIcon />
              </IconButton>
            </div>
            <div className={s.userSubDiv}>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
        
        )
      })}
      <NewUserForm />
    </section>
  )
}

export default editUserAccounts;

export const getServerSideProps = async () => {
  const client = await clientPromise;
  const db = client.db("Campers");
  const col = db.collection("users");
  const allUsers = await col.find().toArray();
  const data = JSON.parse(JSON.stringify(allUsers))
  return {
    props: {
      users: data,
    }
  }
}