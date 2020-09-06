import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { Table, Tag } from "antd";
import "./styles.css";

export default function ContentTable({ data }) {
  const { Column } = Table;
  const tableData = [];
  data.response.forEach((element) => {
    tableData.push({
      key: element.numericCode,
      name: element.name,
      capital: element.capital,
      languages: element.languages,
      currencies: element.currencies,
      timezone: element.timezones,
      borders: element.borders,
      flag: element.flag,
    });
  });

  return (
    <div>
      <Table className="countriesTable" dataSource={tableData}>
        <Column title="Country" dataIndex="name" key="name" />

        <Column title="Capital City" dataIndex="capital" key="capital" />
        <Column
          title="Languages"
          width="300px"
          dataIndex="languages"
          key="languages"
          render={(languages) => (
            <>
              {languages.map((lan) => (
                <Tag color="blue" key={lan.name}>
                  {lan.name}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Currencies"
          dataIndex="currencies"
          key="currencies"
          render={(currencies) => (
            <>
              {currencies.map((cur) => (
                <Tag color="blue" key={cur.name}>
                  {cur.name} ({cur.symbol})
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Time Zones"
          dataIndex="timezone"
          key="timezone"
          render={(timezone) => (
            <>
              {timezone.map((tmz) => (
                <Tag color="blue" key={tmz}>
                  {tmz}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Border Countries"
          width="300px"
          dataIndex="borders"
          key="borders"
          render={(borders) => (
            <>
            {borders.length<1 && <span key='none'>--</span>}
              {borders.map((bor) => (
                <Tag color="blue" key={bor}>
                  {bor}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Flag"
          dataIndex="flag"
          key="flag"
          render={(flag) => (
            <>
              <img alt={flag} className="flags" src={flag} />
            </>
          )}
        />
      </Table>
    </div>
  );
}
ContentTable.propTypes = {
  data: PropTypes.object.isRequired,
};
