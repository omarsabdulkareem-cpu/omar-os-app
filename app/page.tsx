"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/clientApp";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function HomePage() {
  const [items, setItems] = useState([]);

  // Listen to Firestore in real-time
  useEffect(() => {
    const colRef = collection(db, "testData");

    const unsub = onSnapshot(colRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(docs);
    });

    return () => unsub();
  }, []);

  // Add document button
  async function addItem() {
    await addDoc(collection(db, "testData"), {
      text: "Hello Omar - " + new Date().toLocaleString(),
    });
  }

  return (
    <main style={{ padding: 30 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        🔥 Firebase Firestore Test
      </h1>

      <button
        onClick={addItem}
        style={{
          marginTop: 20,
          padding: 10,
          background: "blue",
          color: "white",
          borderRadius: 6,
        }}
      >
        ➕ Add Test Item
      </button>

      <ul style={{ marginTop: 30 }}>
        {items.map((item: any) => (
          <li key={item.id} style={{ padding: 10, border: "1px solid #ccc", marginBottom: 10 }}>
            {item.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
