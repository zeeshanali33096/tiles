import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider";
import GridContainer from "../../Components/GridContainer";
import { DB } from "../../Services/firebase";
import { Tabs, Card, Radio, Avatar, Image } from "antd";
import "./index.css";
import firebase from "firebase";

const { TabPane } = Tabs;
const { Meta } = Card;

export interface Posts {
  createdAt: moment.Moment;
  image: string;
  imageThumb: string;
  uid: string;
}

export interface User {
  dateOfBirth: Date;
  email: string;
  firstName: string;
  gender: string;
  image: string;
  surname: string;
  key: string;
}

const HomePage = () => {
  //   const [lastFetched, setLastFetched] = useState(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [myImages, setMyImages] = useState<Posts[]>([]);
  const [selected, setSelected] = useState<number>(-1);

  //   const;
  const { currentUser }: { currentUser: firebase.User } = useContext(
    AuthContext
  );

  const fetchFriends = async () => {
    try {
      const friendsRef = DB.collection("Friends").doc(currentUser.uid);
      const friendsDoc = await friendsRef.get();
      const friendsData: any = friendsDoc.data();
      const fr = friendsData.friends;
      const promises = fr.map(async (uid: string) => {
        const userRef = DB.collection("Users").doc(uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        return { ...userData, key: userDoc.id };
      });
      const fri: User[] = await Promise.all(promises);
      setFriends(fri);
      //   console.log({ promises });
    } catch (err) {
      console.log({ err });
    }
  };
  useEffect(() => {
    fetchFriends();
  }, []);
  useEffect(() => {
    const postRef = DB.collection("Posts")
      .where(
        "uid",
        "==",
        selected === -1 ? currentUser.uid : friends[selected].key
      )
      .orderBy("createdAt", "desc");

    const listener = postRef.onSnapshot((snap) => {
      //   console.log({ d: snap.docs });
      const snapDocs = snap.docs;

      const newP: Posts[] = snapDocs.map((d) => {
        const p = d.data();
        return {
          ...p,
          createdAt: moment(p.createdAt.toDate()),
        } as Posts;
      });
      setMyImages(newP);
    });

    return () => {
      listener();
    };
  }, [selected]);

  //   const renderProfileMessage = () => {
  //     switch (selected) {
  //         if(selected)
  //       case -1:
  //         return "My Profile";
  //       case 0:
  //           friend[select]
  //     }
  //   };

  return (
    <div className="profile-container">
      <Title style={{ textAlign: "center" }}>
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
          }}
        >
          <Card
            key={currentUser.photoURL}
            hoverable={selected === -1 ? false : true}
            className={selected === -1 ? "selected" : ""}
            onClick={(e) => setSelected(-1)}
            style={{
              height: 200,
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              margin: "1rem 0.5rem",
            }}
            cover={
              <img
                alt={
                  currentUser.displayName ? currentUser.displayName : "My Pic"
                }
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "https://example.com/1.jpg"
                }
                style={{ objectFit: "cover", height: 150 }}
              />
            }
          >
            <Meta title={currentUser.displayName} />
          </Card>
          {/* <Tabs defaultActiveKey="1" tabPosition="top"> */}
          {friends.map((user, i) => (
            <Card
              key={user.image}
              hoverable={selected === i ? false : true}
              className={selected === i ? "selected" : ""}
              onClick={(e) => setSelected(i)}
              style={{
                height: 200,
                minWidth: 300,
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0.5rem",
              }}
              cover={
                <img
                  alt={user.firstName + " " + user.surname}
                  src={user.image}
                  style={{ objectFit: "cover", height: 150 }}
                />
              }
            >
              <Meta title={user.firstName + " " + user.surname} />
            </Card>
          ))}

          {/* </Tabs> */}
        </div>
      </Title>

      <div className="cards-container">
        <GridContainer images={myImages} />
      </div>
    </div>
  );
};

export default HomePage;
