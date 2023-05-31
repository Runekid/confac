import React from "react";
import { ConfacState } from "../../../../reducers/app-state";
import { useSelector } from "react-redux";
import { t } from "../../../utils";
import { Table } from "react-bootstrap";
import moment from "moment";
import InvoiceModel from "../../../invoice/models/InvoiceModel";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";

export const NotVerifiedInvoicesList = () => {
  const models = useSelector((state: ConfacState) => ({
    invoices: state.invoices,
  }));
  const minDueLimit = 16;
  const maxDueLimit = 30;

  let beforeMinDueLimit = filterInvoicesByDueDate(models.invoices, minDueLimit).length;
  let betweenDueLimits = filterInvoicesByDueDate(models.invoices, minDueLimit, maxDueLimit).length;
  let afterMaxDueLimit = filterInvoicesByDueDate(models.invoices, undefined, maxDueLimit).length;

  return (
    <>
      <Container>
        <Row>
          <Link to={`/invoices`}>
            <h5>{t("measurements.invoiceSection.dueInvoicesList.title")}</h5>
          </Link>
          <Table>
            <thead>
              <tr>
                <th scope="col">
                  {t("measurements.invoiceSection.dueInvoicesList.list.ok", { min: minDueLimit })}
                </th>
                <th scope="col">
                  {t(
                    "measurements.invoiceSection.dueInvoicesList.list.warning", { min: minDueLimit, max: maxDueLimit })}
                </th>
                <th scope="col">
                  {t("measurements.invoiceSection.dueInvoicesList.list.danger", { max: maxDueLimit })}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-success">{beforeMinDueLimit}</td>
                <td className="table-warning">{betweenDueLimits}</td>
                <td className="table-danger">{afterMaxDueLimit}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export const filterInvoicesByDueDate = (
  invoices: InvoiceModel[],
  minDueLimit?: number,
  maxDueLimit?: number
): InvoiceModel[] => {
  return invoices
    .filter(invoice => !invoice.verified)
    .filter((invoice) => {
      const daysPassed = moment().diff(invoice.audit.createdOn, "days");
      if (minDueLimit && maxDueLimit) {
        return daysPassed >= minDueLimit && daysPassed <= maxDueLimit;
      }
      if (minDueLimit) {
        return daysPassed < minDueLimit;
      }
      if (maxDueLimit) {
        return daysPassed > maxDueLimit;
      }
      return false;
    });
};

