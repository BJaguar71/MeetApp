import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({events}) => {

  // set the state when there’s events
  const [ data, setData ] = useState([]);

  // get data
  const getData = () => {

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

    // map through events and filter events based on their summary and return an array of them
    const data = genres.map((genre) => {
      const value = events.filter((event) => 
      event.summary.split(" ").includes(genre)).length;

      return { name: genre, value };
    });

    return data;
  };

  // listen to the changes to the events prop. this is necessary, bc we need events to be rendered after the component is mounted
  // the function will run when there is a change to the event
  useEffect(() => { setData(() => getData()); }, [events]);

  return (
    <ResponsiveContainer height={400} >
      <PieChart width={400} height={400} >
        <Pie data={getData()} cx={200} cy={200} labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, precent }) => `${name} ${(precent * 100).toFixed(0)}%`}>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;