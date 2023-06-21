import React, { useState, useEffect } from "react";
import {
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
} from "@ionic/react";

interface Item {
    id: number;
    title: string;
    year: number;
    imgUrl: string;
    shortDescription: string;
}

function Home() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(
                "https://projeto-java-spring-intensivo-production.up.railway.app/games"
            );
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
        }
    };

    return (
        <IonContent>
            <IonList>
                {items.map((item, index) => (
                    <IonItem key={item.id}>
                        <IonAvatar slot="start">
                            <img src={item.imgUrl} alt="avatar" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{item.title}</h2>
                            <p>{item.shortDescription}</p>
                        </IonLabel>
                    </IonItem>
                ))}
            </IonList>
            <IonInfiniteScroll
                onIonInfinite={(ev) => {
                    setTimeout(() => ev.target.complete(), 500);
                }}>
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonContent>
    );
}
export default Home;
