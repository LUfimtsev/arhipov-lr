import React from "react";
import {
  ContractorsProps,
  GoodProps,
  ShopsProps,
  StateProps,
} from "redux/reducer";
import { connect } from "react-redux";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { ChosenGood, InvoiceType } from "components/invoice-acts";

interface Props {
  isAct?: boolean;
  goods: GoodProps[];
  contractors: ContractorsProps[];
  shops: ShopsProps[];
  chosenGoods: ChosenGood[];
  invoiceType: InvoiceType;
  contractor: string;
  shop: string;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 50,
    height: "calc(100% - 164px)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  topTable: {
    justifySelf: "flex-end",
    "& th": {
      textAlign: "left",
      width: 150,
    },
    "& th, & td": {
      border: "1px solid black",
      paddingLeft: 10,
    },
  },
  generalTable: {
    marginBottom: 50,
    "& th, & td": {
      border: "1px solid black",
    },
    "& td": {
      paddingLeft: 10,
    },
  },
  title: {
    textAlign: "center",
    margin: "0 auto",
    marginBottom: 50,
  },
  button: {
    width: 250,
  },
  signature: {
    flexGrow: 1,
  },
}));

const FormedInvoice: React.FC<Props> = ({
  isAct = false,
  goods,
  contractors,
  shops,
  chosenGoods,
  invoiceType,
  contractor,
  shop,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Typography variant="h4" className={classes.title}>
          {!isAct
            ? invoiceType === InvoiceType.Sales
              ? "Расходная накладная"
              : "Приходная накладная"
            : "Акт приемки-передачи"}
        </Typography>
        <table className={classes.topTable}>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Math.floor(Math.random() * 51)}</td>
              <td>{new Date().toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.row}>
        <Typography variant="body1">Склад: WH Number 1</Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="body1">
          {!isAct ? "Поставщик" : "Магазин"}:{" "}
          {!isAct
            ? invoiceType === InvoiceType.Purchase
              ? contractors.find((it) => it._id === contractor)?.name
              : " --"
            : shops.find((it) => it._id === shop)?.name}
        </Typography>
      </div>
      {!isAct && (
        <div className={classes.row}>
          <Typography variant="body1">
            Покупатель:{" "}
            {invoiceType === InvoiceType.Sales
              ? contractors.find((it) => it._id === contractor)?.name
              : " --"}
          </Typography>
        </div>
      )}
      <table className={classes.generalTable}>
        <thead>
          <tr>
            <th>
              <Typography variant="h5">
                <b>№</b>
              </Typography>
            </th>
            <th>
              <Typography variant="h5">
                <b>ID Товара</b>
              </Typography>
            </th>
            <th>
              <Typography variant="h5">
                <b>Наименование</b>
              </Typography>
            </th>
            <th>
              <Typography variant="h5">
                <b>Количество</b>
              </Typography>
            </th>
            <th>
              <Typography variant="h5">
                <b>Единица измерения</b>
              </Typography>
            </th>
            <th>
              <Typography variant="h5">
                <b>Цена (за шт.)</b>
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {chosenGoods.map((item, index) => (
            <tr key={index}>
              <td>
                <Typography variant="h6">{index}</Typography>
              </td>
              <td>
                <Typography variant="h6">{item.goodId}</Typography>
              </td>
              <td>
                <Typography variant="h6">
                  {goods.find((it) => it._id === item.goodId)?.name}
                </Typography>
              </td>
              <td>
                <Typography variant="h6">{item.goodCount}</Typography>
              </td>
              <td>
                <Typography variant="h6">
                  {goods.find((it) => it._id === item.goodId)?.unit}
                </Typography>
              </td>
              <td>
                <Typography variant="h6">
                  {goods.find((it) => it._id === item.goodId)?.cost} руб.
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Typography variant="h4" className={classes.signature}>
        Подпись:{" "}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClose}
      >
        Закрыть
      </Button>
    </div>
  );
};

const mapStateToProps = (state: StateProps) => ({
  goods: state.goods,
  contractors: state.contractors,
  shops: state.shops,
});

export default connect(mapStateToProps)(FormedInvoice);
