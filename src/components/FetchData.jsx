import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { sub, format, parse } from 'date-fns';
import './fetchData.css';
import Card from './Card';
import DatePicker from './DatePicker';
import {
  TextContainer,
  Link,
  Page,
  Layout,
  AppProvider,
} from '@shopify/polaris';

const FetchData = () => {
  const dateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const formattedToday = format(new Date(), dateFormat);
  const formattedPast = format(sub(today, { days: 7 }), dateFormat);
  const [pastDate, setPastDate] = useState(formattedPast);
  const [futureDate, setFutureDate] = useState(formattedToday);

  const url =
    'https://api.nasa.gov/planetary/apod?api_key=VgX4rjrErxe04bJPZ105TftBo0ZvvGAq3VE5llvX';
  const { isLoading, isError, data, refetch } = useQuery('apod-api', () =>
    fetch(`${url}&start_date=${pastDate}&end_date=${futureDate}`).then((res) =>
      res.json()
    )
  );

  const changeHandler = (e) => {
    setPastDate(
      format(
        sub(parse(e.target.value, dateFormat, new Date()), { days: 7 }),
        dateFormat
      )
    );
    setFutureDate(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [pastDate, futureDate, refetch]);

  return (
    <div>
      {isLoading ? (
        <span>Loading ...</span>
      ) : isError ? (
        <span>Ooops!... An error has ocurred.</span>
      ) : (
        <div>
          <AppProvider
            i18n={{
              Polaris: {
                ResourceList: {
                  sortingLabel: 'Sort by',
                  defaultItemSingular: 'item',
                  defaultItemPlural: 'items',
                  showing: 'Showing {itemsCount} {resource}',
                  Item: {
                    viewItem: 'View details for {itemName}',
                  },
                },
                Common: {
                  checkbox: 'checkbox',
                },
              },
            }}
          >
            <Page>
              <Layout>
                <h1 className="title">Spacegram</h1>
                <DatePicker
                  changeHandler={changeHandler}
                  dateFormat={dateFormat}
                  futureDate={futureDate}
                />
                <Card data={data} className="cards" />
                <footer className="footer">
                  <TextContainer>
                    <p>Brought to you by</p>
                    <Link url="https://api.nasa.gov/#apod">
                      APOD Nasa's API
                    </Link>
                    <p>
                      Coded with ❤️ by <Link url="https://nar.works/">Nar</Link>
                    </p>
                  </TextContainer>
                </footer>
              </Layout>
            </Page>
          </AppProvider>
        </div>
      )}
    </div>
  );
};

export default FetchData;
