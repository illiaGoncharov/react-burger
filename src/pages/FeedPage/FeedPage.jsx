import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FeedPage.module.css";
import ListElement from "../FeedList/FeedList";
import {
  wsOrdersFeedConnectionStart,
  wsOrdersFeedConnectionStop,
} from "../../services/actions/wsOrdersFeedData";

import { WS_BASE_URL } from "./../../utils/constants";

const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders, totalToday, total } = useSelector((store) => store.wsOrdersFeed);

  useEffect(() => {
    dispatch(
      wsOrdersFeedConnectionStart(`${WS_BASE_URL}/all`)
    );
    return () => {
      dispatch(wsOrdersFeedConnectionStop());
    };
  }, [dispatch]);

  return orders.length > 0 ? (
    <section className={styles.feed_page__section}>
      <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>
      <main className={styles.feed_page__main}>
        <ul className={`${styles.feed_page__scroll} custom-scroll mr-15`}>
          {orders.length > 0 &&
            orders.map((el, index) => {
              return (
                <li className={styles.feed_page__listElement} key={index}>
                  <Link
                    to={{ pathname: `/feed/${el._id}` }}
                    state={{ background: location }}
                    className={styles.feed_page__link}
                  >
                    <ListElement props={el} />
                  </Link>
                </li>
              );
            })}
        </ul>
        <div>
          <div className={`mb-15 ${styles.feed_page__scoreboard}`}>
            <div className={styles.feed_page__scoreboardElement}>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <div className={`text text_type_digits-default ${styles.feed_page__prepared}`}>
                {orders.map((el, index) => {
                  return (
                    index <= 19 &&
                    el.status === "done" && (
                      <p key={index} className={`text ${styles.feed_page__columnNumber}`}>
                        {el.number}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <div className={`text text_type_digits-default ${styles.feed_page__atWork}`}>
                {orders.map((el, index) => {
                  return (
                    index <= 19 &&
                    el.status === "pending" && (
                      <p key={index} className={`text ${styles.feed_page__columnNumber}`}>
                        {el.number}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mb-15">
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`text text_type_digits-large ${styles.feed_page__number}`}>{total}</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large ${styles.feed_page__number}`}>{totalToday}</p>
          </div>
        </div>
      </main>
    </section>
  ) : (
    <h1>Загрузка...</h1>
  );
};

export default FeedPage;
