import React from 'react';

interface TeamMemberProps {
  image: string;
  name: string;
  surname: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, surname, description }) => {
  return (
    <div style={{
      width:'300px', // Largeur fixe pour toutes les cartes
      maxHeight: '300px', // Hauteur maximale pour toutes les cartes
      backgroundColor: '#f5f5f5', // Couleur de fond légèrement grise
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ombre subtile pour un effet 3D
      margin: '20px', // Marge externe pour espacer les cartes
      padding: '20px', // Padding interne
      display: 'flex', // Active flex pour le positionnement
      flexDirection:'column', // Organise le contenu horizontalement
      alignItems: 'center', // Centrer les éléments verticalement
      alignContent: 'center', // Centrer les éléments horizontalement
      borderRadius: '10px', // Bords arrondis
      overflow: 'hidden', // Masquer les débordements
      textAlign: 'center', // Centrer le texte
      fontWeight: 'bold' // Texte en gras
    }}>
      <img src={image} alt={`${name} ${surname}`} style={{ width: '150px', height: '150px', marginRight: '20px' }} />
      <div>
        <h2 style={{ margin: '0' }}>{name} {surname}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    image: '/img/medic2.webp',
    name: 'Bonefon',
    surname: 'Alexandre',
    description: 'UI/UX designer, back-end developer et DB spécialiste.'
  },
  {
    image: '/img/medic.webp',
    name: 'Chayla',
    surname: 'Loic',
    description: 'UI/UX designer et front-end developer.'
  },
  {
    image: '/img/rickroll.png',
    name: 'Brest',
    surname: 'Thomas',
    description: '3D designer et front-end developer.'
  },
  {
    image: '/img/medic3.webp',
    name: 'Martinoli',
    surname: 'Joshua',
    description: 'UI/UX designer, back-end developer et consultant médical.'
  }
];

const Team: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#add8e6', width: '100%', height:'100%' }}>
      {teamMembers.map((member, index) => (
        <TeamMember
          key={index}
          image={member.image}
          name={member.name}
          surname={member.surname}
          description={member.description}
        />
      ))}
    </div>
  );
};

export default Team;

