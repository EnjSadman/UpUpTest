import { DataTable } from "../../components/DataTable/DataTable";
import { DialogWindow } from "../../components/DialogWindow/DialogWindow";
import { Toolbar } from "../../components/Toolbar/Toolbar";

export function Main() {
  return (
    <>
      <DialogWindow />
      <Toolbar />
      <DataTable />
    </>
  )
}