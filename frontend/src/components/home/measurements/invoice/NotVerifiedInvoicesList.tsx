import React from "react";
import { ConfacState } from "../../../../reducers/app-state";
import { useSelector } from "react-redux";
import { t } from "../../../utils";
import { Table } from "react-bootstrap";
import moment from "moment";
import InvoiceModel from "../../../invoice/models/InvoiceModel";
import { Link } from "react-router-dom";

const NotVerifiedInvoicesList = () => {
  const models = useSelector((state: ConfacState) => ({
    invoices: state.invoices,
  }));
  const dueLimitA = 16;
  const dueLimitB = 30;
  let beforeDueLimitA = filterInvoicesByDueDate(
    models.invoices,
    dueLimitA
  ).length;

  let betweenDueLimits = filterInvoicesByDueDate(
    models.invoices,
    dueLimitA,
    dueLimitB
  ).length;

  let afterDueLimitB = filterInvoicesByDueDate(
    models.invoices,
    undefined,
    dueLimitB
  ).length;

  return (
    <>
      <Link>
        <h5>{t("measurements.invoiceSection.dueInvoicesList.title")}</h5>
      </Link>
      <Table>
        <thead>
          <tr>
            <th scope="col">
              {t("measurements.invoiceSection.dueInvoicesList.list.ok")}
            </th>
            <th scope="col">
              {t("measurements.invoiceSection.dueInvoicesList.list.warning")}
            </th>
            <th scope="col">
              {t("measurements.invoiceSection.dueInvoicesList.list.danger")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-success">{beforeDueLimitA}</td>
            <td className="table-warning">{betweenDueLimits}</td>
            <td className="table-danger">{afterDueLimitB}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default NotVerifiedInvoicesList;

export const filterInvoicesByDueDate = (
  invoices: InvoiceModel[],
  dueLimitA?: number,
  dueLimitB?: number
) => {
  return invoices.filter((invoice) => {
    if (invoice.verified) {
      return false;
    }
    const daysPassed = moment().diff(invoice.audit.createdOn, "days");
    if (dueLimitA && dueLimitB) {
      return daysPassed >= dueLimitA && daysPassed <= dueLimitB;
    }
    if (dueLimitA) {
      return daysPassed < dueLimitA;
    } else if (dueLimitB) {
      return daysPassed > dueLimitB;
    }
    return false;
  });
};

