import { Fragment } from "react";
import s from "./index.module.css";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminOverviewTable from "@/components/admin/AdminOverviewTable";
import AdminTransTable from "@/components/admin/AdminTransTable";
import TableFilterSort from "@/components/admin/TableFilterSort";
import AdminNav from "@/components/admin/AdminNav";

const dashboard = () => {
  return (
    <Fragment>
      <section className={s.adminSection}>
        <h1>Admin Dashboard...</h1>
        <AdminNav />
        <AdminOverview />
				<div className={s.summaryContDiv}>
					<AdminOverviewTable />
        </div>
				<div className={s.summaryContDiv}>
					<TableFilterSort />
				</div>
				<div className={s.summaryContDiv}>
					<AdminTransTable />
				</div>
      </section>
    </Fragment>
  );
};

export default dashboard;
