interface FooterInfoProps {
  iconName: string;
  text: string;
}

const FooterInfo: React.FC<FooterInfoProps> = ({ iconName, text }) => {
  return (
    <div className="flex">
      <i className="material-icons footer-info">{iconName}</i>
      <p className="footer-info ml-1">{text}</p>
    </div>
  );
};

export default FooterInfo;
