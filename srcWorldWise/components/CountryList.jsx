/* eslint-disable react/prop-types */
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";

import styles from "./CountryList.module.css";

export default function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return <Message message="Add your country!!!" />;
  }

  // To remove the duplicates, you use the filter() method
  // to include only elements whose indexes match their indexOf values:

  // let chars = ["A", "B", "A", "C", "B"];

  // let uniqueChars = chars.filter((c, index) => {
  //   return chars.indexOf(c) === index;
  // });

  // console.log(uniqueChars);

  // remove duplicate objects

  // const books = [
  //   { title: "C++", author: "Bjarne" },
  //   { title: "Java", author: "James" },
  //   { title: "Python", author: "Guido" },
  //   { title: "Java", author: "James" },
  // ];

  // const unique = books.filter((obj, index) => {
  //   return index === books.findIndex((o) => obj.title === o.title);
  // });

  // console.log(unique);

  const countries = cities.reduce((total, city) => {
    if (!total.map((obj) => obj.country).includes(city.country)) {
      return [...total, { country: city.country, emoji: city.yetanotheremoji }];
    } else {
      return total;
    }
  }, []);

  // const countries = cities
  //   .reduce((total, city) => {
  //     total.push({ country: city.country, emoji: city.yetanotheremoji });
  //     return total;
  //   }, [])
  //   .filter((obj, index, self) => {
  //     let searchedIndex = self.findIndex((o) => o.country === obj.country);
  //     return index === searchedIndex;
  //   });

  // console.log("data: ", countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={crypto.randomUUID()} />;
      })}
    </ul>
  );
}
