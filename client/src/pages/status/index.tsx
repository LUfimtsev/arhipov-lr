import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import useAsyncEffect from "use-async-effect";
import { saveGoods, saveShops } from "redux/actions";
import { GoodProps, ShopsProps, StateProps } from "redux/reducer";
import { connect, useDispatch } from "react-redux";
import { useHttp } from "hooks/http";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  instance: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
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
  mb15: {
    marginBottom: 15,
  },
}));

interface Props {
  shops: ShopsProps[];
  goods: GoodProps[];
}

interface StocksProps {
  _id: string;
  shopId: string;
  goodId: string;
  count: number;
}

const Status = ({ shops, goods }: Props) => {
  const classes = useStyles();
  const { request } = useHttp();
  const dispatch = useDispatch();

  const [stocks, setStocks] = useState<StocksProps[]>([]);

  useAsyncEffect(async () => {
    let result;
    if (!shops.length) {
      result = await request("/api/shops/getAll", "GET");
      await dispatch(saveShops(result.data));
    }
    if (!goods.length) {
      result = await request("/api/goods/getAll", "GET");
      await dispatch(saveGoods(result.data));
    }
    result = await request("/api/stocks/getAll", "GET");
    setStocks(result.data);
  }, []);

  return (
    <div className={classes.root}>
      {stocks.map((item) => (
        <div className={classes.instance} key={item._id}>
          <Typography variant="body1" className={classes.mb15}>
            {shops.find((it) => it._id === item.shopId)?.name}
          </Typography>
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
              {[goods.find((it) => it._id === item.goodId)].map((i, index) => (
                <tr key={index}>
                  <td>
                    <Typography variant="h6">{index}</Typography>
                  </td>
                  <td>
                    <Typography variant="h6">{i?._id}</Typography>
                  </td>
                  <td>
                    <Typography variant="h6">{i?.name}</Typography>
                  </td>
                  <td>
                    <Typography variant="h6">{item.count}</Typography>
                  </td>
                  <td>
                    <Typography variant="h6">{i?.unit}</Typography>
                  </td>
                  <td>
                    <Typography variant="h6">{i?.cost} руб.</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: StateProps) => ({
  shops: state.shops,
  goods: state.goods,
});

export default connect(mapStateToProps)(Status);
