export interface CardProps {
  title: string;
  cardImage: string;
  cardContent: string;
  cardDesc: string;
  buttonDetails: Array<{
    text: string;
    showModal: boolean;
    modalType?: string;
    routeTo?: string;
  }>;
}

export interface joinTeamModal {
    showModal: string | undefined;
    setShowModal: (showModal: string) => void;
}