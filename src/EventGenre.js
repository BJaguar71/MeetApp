import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import "./App.css";

const EventGenre = ({ events }) => {

  // set the state when there’s events
  const [data, setData] = useState([]);

  // get data
  const getData = () => {

    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];

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
  useEffect(() => { setData(); }, [events]);

  return (
    <ResponsiveContainer height={400} width={800}>
      <PieChart className="pi-chart">
        <Pie 
          data={getData()} 
          cx={350} 
          cy={200} 
          labelLine={false} 
          outerRadius={80} 
          fill="#ffe1a8" 
          dataKey="value" 
          label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : "" }
        >
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;