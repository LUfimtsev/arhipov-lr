import React, { useState } from "react";
import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import useAsyncEffect from "use-async-effect";
import AddIcon from "@material-ui/icons/Add";
import { log, useHttp } from "hooks/http";
import {
  ContractorsProps,
  GoodProps,
  ShopsProps,
  StateProps,
} from "redux/reducer";
import { connect, useDispatch } from "react-redux";
import { saveContractors, saveGoods, saveShops } from "redux/actions";
import FormedInvoice from "components/formed-invoice";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    marginBottom: 15,
  },
  field: {
    width: 250,
  },
  mb15: {
    marginBottom: 15,
  },
  mb10: {
    marginBottom: 10,
  },
  mr50: {
    marginRight: 50,
  },
  button: {
    width: 250,
  },
}));

export interface ChosenGood {
  goodId: string;
  goodCount: number;
}

export enum InvoiceType {
  Purchase = "1",
  Sales = "2",
}

enum Mode {
  Edit = "1",
  View = "2",
}

const InvoiceActs = ({
  goods,
  contractors,
  shops,
  isAct = false,
}: {
  goods: GoodProps[];
  contractors: ContractorsProps[];
  shops: ShopsProps[];
  isAct?: boolean;
}) => {
  const classes = useStyles();
  const { request } = useHttp();
  const dispatch = useDispatch();

  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.Purchase
  );
  const [contractor, setContractor] = useState<string>("");
  const [shop, setShop] = useState<string>("");
  const [chosenGoods, setChosenGoods] = useState<ChosenGood[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.Edit);

  const handleInvoiceTypeChange = (event: any) => {
    setInvoiceType(event.target.value);
  };
  const handleContractorTypeChange = (event: any) => {
    setContractor(event.target.value);
  };
  const handleShopChange = (event: any) => {
    setShop(event.target.value);
  };
  const handleGoodSelection = (event: any, goodIndex: number) => {
    const newValue = event.target.value;
    const newGoods = chosenGoods.slice();
    newGoods[goodIndex].goodId = newValue;
    setChosenGoods(newGoods);
  };
  const handleGoodCountChange = (event: any, goodIndex: number) => {
    const newValue = Number(event.target.value);
    let newGoods = chosenGoods.slice();
    if (newValue > 0) {
      newGoods[goodIndex].goodCount = newValue;
    } else if (chosenGoods.length > 1) {
      newGoods = newGoods.filter((it, index) => index !== goodIndex);
    }
    setChosenGoods(newGoods);
  };
  const handleAddNewGood = async () => {
    setChosenGoods([...chosenGoods, { goodId: goods[0]._id, goodCount: 1 }]);
    await log("Добавлен новый товар");
  };
  const handleFormInvoice = async () => {
    setMode(Mode.View);
    await log(`Формирование ${isAct ? "Акта" : "Накладной"}`);
  };

  useAsyncEffect(async () => {
    await log(
      `Переход на страницу ${isAct ? "Актов приемки-передачи" : "Накладных"}`
    );
    let goodsData = goods;
    let contractorsData = contractors;
    let shopsData = shops;
    let result;
    if (!goods.length) {
      result = await request("/api/goods/getAll", "GET");
      goodsData = result.data;

      await dispatch(saveGoods(goodsData));
    }
    if (!contractors.length) {
      result = await request("/api/contractors/getAll", "GET");
      contractorsData = result.data;

      await dispatch(saveContractors(contractorsData));
    }
    if (!shops.length) {
      result = await request("/api/shops/getAll", "GET");
      shopsData = result.data;

      await dispatch(saveShops(shopsData));
    }
    setChosenGoods([
      { goodId: goods.length ? goods[0]._id : goodsData[0]._id, goodCount: 1 },
    ]);
    setContractor(contractorsData[0]._id);
    setShop(shopsData[0]._id);
  }, []);

  return mode === Mode.Edit ? (
    <div className={classes.root}>
      <div className={classes.row}>
        {!isAct && (
          <div className={classes.mr50}>
            <Typography variant="body1" className={classes.mb10}>
              Тип:
            </Typography>
            <Select
              variant="outlined"
              value={invoiceType}
              className={classes.field}
              onChange={handleInvoiceTypeChange}
            >
              <MenuItem value="1">Приходная накладная</MenuItem>
              <MenuItem value="2">Расходная накладная</MenuItem>
            </Select>
          </div>
        )}
        <div>
          <Typography variant="body1" className={classes.mb10}>
            {!isAct ? "Поставщик" : "Магазин"}:
          </Typography>
          <Select
            variant="outlined"
            value={!isAct ? contractor : shop}
            className={classes.field}
            onChange={(val) =>
              !isAct ? handleContractorTypeChange(val) : handleShopChange(val)
            }
          >
            {!isAct
              ? contractors.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))
              : shops.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
          </Select>
        </div>
      </div>
      {chosenGoods.map((item, index) => (
        <div key={index} className={classes.row}>
          <div className={classes.mr50}>
            <Typography variant="body1" className={classes.mb10}>
              Товар:
            </Typography>
            <Select
              variant="outlined"
              value={item.goodId}
              className={classes.field}
              onChange={(val) => handleGoodSelection(val, index)}
            >
              {goods.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Typography variant="body1" className={classes.mb10}>
              Количество:
            </Typography>
            <TextField
              variant="outlined"
              className={classes.field}
              value={item.goodCount}
              onChange={(val) => handleGoodCountChange(val, index)}
              type="number"
            />
          </div>
        </div>
      ))}
      <Button
        variant="text"
        color="primary"
        className={`${classes.button} ${classes.mb15}`}
        startIcon={<AddIcon />}
        onClick={handleAddNewGood}
        disabled={chosenGoods.length === goods.length}
      >
        Добавить товар
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleFormInvoice}
      >
        Сформировать
      </Button>
    </div>
  ) : (
    <FormedInvoice
      invoiceType={invoiceType}
      chosenGoods={chosenGoods}
      contractor={contractor}
      shop={shop}
      onClose={() => setMode(Mode.Edit)}
      isAct={isAct}
    />
  );
};

const mapStateToProps = (state: StateProps) => ({
  goods: state.goods,
  contractors: state.contractors,
  shops: state.shops,
});

export default connect(mapStateToProps)(InvoiceActs);
