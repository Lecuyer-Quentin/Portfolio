import { createContext, useState } from "react";
import heroImage from '../../assets/images/Online world-amico.svg'
import reactLogo from '../../assets/logos/react-logo.png'
import nodeLogo from '../../assets/logos/node-logo.png'
import mongoLogo from '../../assets/logos/mongodb.png'


const HeroData = {
    title: "Bienvenue sur mon portfolio Fullstack M.E.R.N",
    description: [
        <>
            <p>Je suis un développeur Fullstack M.E.R.N passionné par la création d'applications Web robustes et évolutives.</p>
            <p>Mon expertise s'étend des technologies côté client de React aux composants côté serveur et à la gestion des bases de données."</p>
            <p>Je suis déterminé à offrir des solutions numériques exceptionnelles en utilisant une approche orientée vers la qualité, l'évolutivité et la satisfaction du client.</p>
        </>
    ],
    images: [
        {
            src: heroImage,
            alt: "Hero Image"
        },
    ]
}

const FeaturesData = [
    {
        title: `Développement Front-End avec React:`,
        description: `La création d'interfaces utilisateur réactives et conviviales est ma passion. J'utilise React pour concevoir des expériences utilisateur exceptionnelles en combinant des composants réutilisables, des états gérés efficacement et des interactions fluides.`,
        images: [
            {
                src: reactLogo,
                alt: "React Logo"
            },
        ]
    },
    {
        title: `Développement Back-End solide :`,
        description: `Mon expertise ne s'arrête pas au Front-End. Je suis compétent dans la création de serveurs robustes et évolutifs en utilisant des technologies telles que Node.js, Express, et MongoDB. Je suis également à l'aise avec les bases de données SQL et les concepts de gestion des données.`,
        images: [
            {
                src: nodeLogo,
                alt: "Node.js Logo"
            },
            {
                src: mongoLogo,
                alt: "MongoDB Logo"
            },
        ]
    },
    {
        title: `Tests et Assurance Qualité :`,
        description: `La qualité du code est ma priorité. Je mets en œuvre des tests unitaires, des tests d'intégration et des pratiques de développement piloté par les tests pour garantir des applications robustes et sans bug.`,
        images: [
            {
                src: "https://res.cloudinary.com/djnv06fje/image/upload/v1631761939/Portfolio%20Website/jest-logo-512_ig4q0l.png",
                alt: "Jest Logo"
            },
            {
                src: "https://res.cloudinary.com/djnv06fje/image/upload/v1631761939/Portfolio%20Website/mocha-logo-512_gxqk9s.png",
                alt: "Mocha Logo"
            },
        ]
    },
    {
        title: `Collaboration Agile :`,
        description: `Je suis un fervent partisan des méthodologies de développement Agile. J'utilise des outils tels que Jira et Trello pour gérer les projets et collaborer efficacement avec les équipes.`,
        images: [
            {
                src: "https://res.cloudinary.com/djnv06fje/image/upload/v1631761939/Portfolio%20Website/jira-logo-512_ah9h5q.png",
                alt: "Jira Logo"
            },
            {
                src: "https://res.cloudinary.com/djnv06fje/image/upload/v1631761939/Portfolio%20Website/trello-logo-512_xqzv6z.png",
                alt: "Trello Logo"
            },
        ]
    }
]


const dataContext = createContext(
    {
        hero: HeroData,
        features: FeaturesData,
    }
);


const HeroDataProvider = ({ children }) => {
    const [hero, setHero] = useState(HeroData);
    const addHero = (newHero) => {
        setHero([...hero, newHero]);
    }
    return (
        <dataContext.Provider value={{ hero, addHero }}>
            {children}
        </dataContext.Provider>
    )
}

const FeaturesDataProvider = ({ children }) => {
    const [features, setFeatures] = useState(FeaturesData);
    const addFeatures = (newFeatures) => {
        setFeatures([...features, newFeatures]);
    }
    return (
        <dataContext.Provider value={{ features, addFeatures }}>
            {children}
        </dataContext.Provider>
    )
}

export { dataContext, HeroDataProvider, FeaturesDataProvider };
