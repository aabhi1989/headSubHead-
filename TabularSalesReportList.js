import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import { Link } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#786aa9",
    lineHeight: "1rem",
    padding: "10px",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    lineHeight: "1rem",
    padding: "10px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TabularSalesReportList(props) {
  const classes = useStyles();
  const { columns, data, agentDetail } = props;
  const sortKey = "agentName";
  let newArr = [];
  Object.keys(columns).map((column) => {
    if (columns[column].type === "subHead") {
      Object.keys(columns[column].subCat).map((col) => {
        newArr.push(columns[column].subCat[col].label);
      });
    } else {
      newArr.push(columns[column].label);
    }
  });

  const getTableHeader = () => (
    <TableHead>
      <TableRow>
        {Object.keys(columns).map((column, i) => (
          <StyledTableCell
            key={`header1_${i}`}
            align="center"
            colSpan={columns[column].type === "subHead" ? 2 : 1}
            className={columns[column].type === "subHead" ? "subcol2" : "subcol1"}
          >
            {columns[column].type === "subHead" ? columns[column].label : ""}
          </StyledTableCell>
        ))}
      </TableRow>
      <TableRow>
        {newArr.map((col, index) => (
          <StyledTableCell
            key={`header2_${index}`}
            className="subHeadCol"
            align="center"
          >
            {col}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const getTableBody = () => (
    <TableBody>
      {data
        .sort((d1, d2) => d2[sortKey] - d1[sortKey])
        .map((row, index) => (
          <StyledTableRow key={`row_${index}`}>
            {Object.keys(columns).map((column, i) => {
              if (columns[column].type !== "subHead") {
                return (
                  <StyledTableCell
                    component="td"
                    scope="row"
                    align="center"
                    key={`subHead1_${i}`}
                    className="tableBodyCol"
                  >
                    {getValue(
                      row[column],
                      columns[column].type,
                      columns[column],
                      row
                    )}
                  </StyledTableCell>
                );
              } else {
                return columns[column].subValue.map((col, ind) => {
                  return (
                    <StyledTableCell
                      component="td"
                      scope="row"
                      align="center"
                      key={`subHead_${ind}`}
                      className="tableBodyCol"
                    >
                      {getSubValue(row[column], col.key)}
                    </StyledTableCell>
                  );
                });
              }
            })}
          </StyledTableRow>
        ))}
    </TableBody>
  );

  const getValue = (value, type, itemObj, data) => {
    switch (type) {
      case "link":
        return (
          <span
            className="linkClass"
            onClick={() => agentDetail(data.agentId, data.agentName)}
          >
            {itemObj.key === "agentName"
              ? `${value} (${data.agentDesignation})`
              : value}
          </span>
        );
      default:
        if (value === undefined || value === null) return "";
        return value;
    }
  };

  const getSubValue = (value, key) => {
    if (!value) return "";
    else return value[key];
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        {getTableHeader()}
        {getTableBody()}
      </Table>
    </TableContainer>
  );
}
