import React, { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useHttp } from "hooks/http";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    padding: 50,
  },
  generalTable: {
    width: "100%",
    "& th, & td": {
      border: "1px solid black",
    },
    "& td": {
      paddingLeft: 10,
    },
  },
}));

interface LogProps {
  _id: string;
  userId: string;
  userLogin: string;
  actionName: string;
  date: string;
}

interface LogWithLoginProps extends LogProps {
  login: string;
}

const Log = () => {
  const classes = useStyles();
  const { request } = useHttp();
  const [logs, setLogs] = useState<LogWithLoginProps[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useAsyncEffect(async () => {
    const result = await request("/api/logs/getByUser", "POST", {
      userId: localStorage.getItem("userId"),
    });
    const arrayWithLogins: LogWithLoginProps[] = result.data.map(
      (item: LogProps) => ({
        ...item,
        login: result.logins.find(
          (it: { id: string; login: string }) => it.id === item.userId
        )?.login,
      })
    );
    setIsAdmin(result.isAdmin);
    setLogs(
      arrayWithLogins.map((item: LogWithLoginProps) => {
        const newDate = new Date(item.date);
        return {
          ...item,
          date: `${newDate.getDate()}/${
            newDate.getMonth() + 1
          }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
        };
      })
    );
  }, []);

  return (
    <div className={classes.root}>
      <table className={classes.generalTable}>
        <thead>
          <tr>
            <th>
              <Typography variant="body1">№</Typography>
            </th>
            {isAdmin && (
              <th>
                <Typography variant="body1">Пользователь</Typography>
              </th>
            )}
            <th>
              <Typography variant="body1">Действие</Typography>
            </th>
            <th>
              <Typography variant="body1">Дата</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((item, index) => (
            <tr key={item._id}>
              <td>
                <Typography variant="caption">{index}</Typography>
              </td>
              {isAdmin && (
                <td>
                  <Typography variant="caption">{item.login}</Typography>
                </td>
              )}
              <td>
                <Typography variant="caption">{item.actionName}</Typography>
              </td>
              <td>
                <Typography variant="caption">{item.date}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
