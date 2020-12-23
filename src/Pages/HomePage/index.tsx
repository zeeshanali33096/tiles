import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider";
import GridContainer from "../../Components/GridContainer";
import { DB } from "../../Services/firebase";
import "./index.css";

export interface Posts {
  createdAt: moment.Moment;
  image: string;
  imageThumb: string;
  uid: string;
}

const HomePage = () => {
//   const [lastFetched, setLastFetched] = useState(null);
  const [myImages, setMyImages] = useState<Posts[]>([]);

  //   const;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const postRef = DB.collection("Posts")
      .where("uid", "==", currentUser.uid)
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
  }, []);

  return (
    <div className="profile-container">
      <Title style={{ textAlign: "center" }}>Profile</Title>
      <div className="cards-container">
        <GridContainer images={myImages} />
      </div>
    </div>
  );
};

export default HomePage;
