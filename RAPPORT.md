# Rapport d'Innovation : RAM Green Wings

## 1. Contexte et Opportunités

Le secteur du transport aérien est à un tournant critique. Confronté à une pression croissante de la part des régulateurs, du public et des investisseurs, il doit impérativement réduire son empreinte environnementale. La conscience écologique des voyageurs évolue : ils ne sont plus de simples passagers, mais des acteurs en quête de consommation plus responsable. Cette mutation représente une menace pour les compagnies qui l'ignorent, mais une **opportunité stratégique majeure** pour celles qui, comme Royal Air Maroc, choisissent de la saisir.

L'opportunité pour RAM est double :
1.  **Se différencier** sur un marché compétitif en devenant un pionnier de l'aviation durable en Afrique.
2.  **Répondre à une demande latente** des clients pour des options de voyage plus vertes, transformant une contrainte réglementaire en un avantage commercial.

Le projet "Green Wings" s'inscrit au cœur de cette dynamique, en proposant une solution concrète qui aligne les impératifs écologiques avec les attentes des clients et les objectifs d'affaires de la compagnie.

## 2. Énoncé du Problème

Le problème central est double : 

*   **Manque de Transparence et d'Action pour le Passager :** Le voyageur moyen est conscient de l'impact climatique de l'aviation, mais se sent impuissant. Les informations sur l'empreinte carbone de son vol sont souvent inexistantes, opaques ou déconnectées du processus de décision. Il n'existe pas de mécanisme simple et incitatif lui permettant d'agir concrètement pour réduire cet impact au moment de la réservation.

*   **Dilemme Économique pour la Compagnie :** La transition vers une aviation plus durable (notamment via l'adoption des Carburants d'Aviation Durables - SAF) représente un coût significatif. Comment financer cette transition sans aliéner les clients par une augmentation généralisée des prix ?

"Green Wings" a été conçu pour résoudre ce double problème en créant un pont entre la volonté d'agir du passager et le besoin de financement de la compagnie.

## 3. Solutions Proposées

Pour répondre à cette problématique, notre projet met en œuvre un écosystème de solutions intégrées directement dans le parcours de réservation de l'utilisateur. Ces solutions sont conçues pour être à la fois incitatives, transparentes et engageantes.

1.  **Calculateur d'Empreinte Carbone Intégré et Transparent**
    Pour chaque vol, nous affichons une estimation claire de son empreinte carbone. Notre méthodologie de calcul repose sur une formule claire :

    *   **Étape 1 : Calcul des Émissions Totales du Vol**
        *   `TotalCO2e = (Distance * FuelConsumption) * CO2Factor * RadiativeFactor`
    *   **Étape 2 : Distribution des Émissions par Siège**
        *   `EmissionsParUnité = TotalCO2e / TotalUnitésPondérées`
    *   **Étape 3 : Calcul de l'Empreinte Individuelle**
        *   `EmpreintePassager = EmissionsParUnité * PondérationDeSaClasse`

2.  **Programme de Fidélité "Green Points"**
    Nous avons créé un programme de fidélité innovant qui récompense les choix durables. La logique est conçue pour **inciter les voyageurs à choisir les options les moins émissives**.

    **Logique et Formule de Calcul :**

    Le calcul des points est inversement proportionnel à l'empreinte carbone du vol sélectionné et est pondéré par la classe de voyage :

    *   **Principe de Base :** Moins le vol pollue, plus il rapporte de points. Ceci est réalisé en divisant une constante de base par l'empreinte carbone calculée. 

    *   **Multiplicateur de Classe (Contribution SAF) :** Pour encourager davantage les contributions directes à la durabilité, nous appliquons un multiplicateur pour les classes qui incluent une contribution aux Carburants d'Aviation Durables (SAF). Une classe comme "Economy Flex" aura un multiplicateur plus élevé qu'une classe "Economy" standard.

    *Formule : `PointsGagnés = (ConstanteDeBase / EmpreinteCarbone) * MultiplicateurSAF`*

    **Exemple Concret :**
    *   Un vol Paris-Dakar en classe Économique (empreinte de 300kg CO2e) pourrait rapporter : `(50000 / 300) * 1.0 = 167 points`.
    *   Le même vol en classe "Économique Flex" (même empreinte, mais avec contribution SAF) rapporterait : `(50000 / 300) * 1.5 = 250 points`.

    **Hypothèses et Justification :**
    *   La **`ConstanteDeBase`** est un levier d'ajustement qui nous permet de calibrer la générosité globale du programme.
    *   Le **`MultiplicateurSAF`** est un levier stratégique pour rendre les tarifs contributifs plus attractifs. Il récompense directement l'effort financier du client.
    *   Cette formule crée une **incitation économique claire et directe** à choisir non seulement les vols les plus efficaces, mais aussi les tarifs qui soutiennent activement la transition énergétique.

### Références Méthodologiques

La méthodologie de calcul de l'empreinte carbone adoptée dans ce projet, bien que simplifiée pour une application directe, s'inspire des principes et des normes établis par les organismes de référence suivants :

*   **Organisation de l'Aviation Civile Internationale (OACI/ICAO) :** L'OACI fournit les méthodologies fondamentales pour estimer la consommation de carburant en fonction du type d'appareil et de la distance de vol. Notre utilisation d'un facteur de consommation de carburant (`FuelConsumption`) est alignée avec cette approche.

*   **Groupe d'experts intergouvernemental sur l'évolution du climat (GIEC) :** Le GIEC est la source de référence pour les facteurs d'émission (`CO2Factor`), qui permettent de convertir une quantité de kérosène brûlé en quantité de CO2 émise. De plus, le concept de forçage radiatif (`RadiativeFactor`), qui prend en compte les effets réchauffants autres que le CO2 (comme les traînées de condensation et les oxydes d'azote), est un principe mis en avant par le GIEC pour une évaluation plus complète de l'impact climatique de l'aviation.

*   **Department for Environment, Food & Rural Affairs (DEFRA) du Royaume-Uni & ADEME (France) :** Ces agences gouvernementales publient des facteurs de conversion détaillés et régulièrement mis à jour. Elles fournissent également des standards pour la pondération des émissions en fonction des classes de voyage (économique, affaires, première), reconnaissant que les sièges des classes supérieures occupent plus d'espace et sont donc responsables d'une part plus importante des émissions totales. Notre `PondérationDeSaClasse` est une application de ce principe.

En nous appuyant sur ces références, nous nous assurons que notre calculateur, bien que simplifié pour l'expérience utilisateur, repose sur des fondements scientifiques et des pratiques reconnues internationalement.

3.  **Tarifs Éco-responsables avec Contribution SAF**
    Nous avons introduit des classes tarifaires spécifiques, comme "Économique Flex", qui incluent une contribution au financement des Carburants d'Aviation Durables (SAF).

4.  **Tableau de Bord de Durabilité et Gamification**
    Chaque utilisateur dispose d’un espace personnel où il peut suivre son solde de “Green Points”, consulter l’historique de ses contributions et visualiser son **badge de durabilité**. Les badges (Bronze, Silver, Gold, Platinum) sont attribués en fonction des points accumulés, ajoutant une dimension de statut et de reconnaissance sociale qui renforce l'engagement.

## 4. Objectifs et Buts Principaux

**Objectif Principal :** Réduire de manière mesurable l'empreinte carbone globale des vols réservés via notre plateforme en influençant positivement les décisions d'achat des voyageurs.

Nos buts spécifiques sont :

-   **Inciter au Changement de Comportement** : Orienter au moins 15% des voyageurs vers des options de vol à plus faible émission ou vers des tarifs contribuant au SAF au cours de la première année.
-   **Accroître la Sensibilisation** : Éduquer 100% de nos utilisateurs sur l'impact carbone de leurs voyages en rendant l'information accessible et compréhensible.
-   **Promouvoir le Financement des SAF** : Créer un nouveau flux de revenus contributif pour l'achat de Carburants d'Aviation Durables.
-   **Renforcer la Fidélité et l'Image de Marque** : Positionner RAM comme un leader de l'innovation durable, en créant une communauté de voyageurs engagés.

## 5. Innovation et Durabilité

L'innovation de "Green Wings" réside dans la **combinaison intelligente et l'intégration fluide de plusieurs concepts** au service de la durabilité :

*   **Innovation par la Gamification** : Nous transformons l'écologie d'une contrainte en un jeu. Le passager n'est plus coupable, il devient un héros de la décarbonation.
*   **Innovation par la Transparence Radicale** : Là où l'industrie est souvent opaque, nous faisons le pari de la clarté. L'affichage direct de l'empreinte carbone responsabilise le client.
*   **Innovation de Modèle Économique** : Nous créons un cercle vertueux où le choix durable du client finance la transition écologique de la compagnie.

## 6. Position de Valeurs

*   **Pour le Voyageur** : "Voyagez en accord avec vos valeurs. Vos choix responsables sont enfin vus, récompensés et ont un impact réel."
*   **Pour Royal Air Maroc** : "Engagez vos clients dans une mission commune. Transformez la contrainte écologique en un levier de fidélisation et de croissance."

## 7. Business Model et Revenus Streams

Le modèle repose sur la création de valeur partagée.

*   **Flux de Revenus Directs** : Marge additionnelle générée par les surclassements tarifaires vers des options "Flex" incluant une contribution SAF.
*   **Flux de Revenus Indirects** : Augmentation de la fidélité client, amélioration de l'image de marque, et acquisition de nouveaux segments de clientèle.

## 8. Ressources et Activités Clés

*   **Ressources Clés** : Plateforme technologique, données de vol, algorithmes de calcul, équipes projet, marque RAM.
*   **Activités Clés** : Développement continu, marketing, analyse de données, partenariats stratégiques (fournisseurs SAF).

## 9. Partenaires et Soutiens

*   **Fournisseurs de SAF**, **ONG environnementales** (pour audit et crédibilité), **partenaires de l'écosystème du voyage**, et **agences gouvernementales**.

## 10. Feuille de Route pour les Prochaines Étapes

*   **Phase 1 (3 mois)** : Lancement de la plateforme et campagne de communication.
*   **Phase 2 (3-9 mois)** : Optimisation basée sur les données et les retours utilisateurs.
*   **Phase 3 (9-18 mois)** : Expansion du programme (partenaires, nouvelles fonctionnalités).

## 11. Conclusion et Appel à l'Action

"Green Wings" est une vision stratégique pour l'avenir de Royal Air Maroc. C'est la reconnaissance que la durabilité est un investissement dans la pertinence et la profitabilité futures. En adoptant ce projet, RAM tisse un nouveau lien avec ses clients, fondé sur la confiance et des valeurs partagées.

Nous appelons la direction à soutenir pleinement cette initiative, à allouer les ressources nécessaires à son succès et à en faire le fer de lance de la stratégie d'innovation de la compagnie. **Il est temps de donner des ailes vertes à nos ambitions.**
