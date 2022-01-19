import { React, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { sub, format, parse } from 'date-fns';

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
          <form>
            <label>
              Select date
              <input
                type="date"
                max={format(new Date(), dateFormat)}
                name="futureDate"
                value={futureDate}
                onChange={(e) => changeHandler(e)}
              />
            </label>
          </form>
          {data?.map((card) => {
            return (
              <div key={card?.date}>
                <h2>{card?.title}</h2>
                <p>{card?.date}</p>
                <img src={card?.url} alt={card?.title} width="300" />
                <p>{card?.explanation}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FetchData;
