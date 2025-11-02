import FooterInfo from "./FooterInfo";


const Footer: React.FC = () => {
    return (
    <footer className="flex flex-col justify-around">
      <div className="gFlexB px-3 mb-4">
          <FooterInfo iconName="home" text="Pingisvägen 1" />
          <FooterInfo iconName="phone" text="08-123 45 67" />
          <FooterInfo iconName="mail" text="ppp@pingis.se" />
      </div>
      <div className="flex justify-center">
          <p className="footer-info">copyright @ 2025 PingPongPortal</p>
      </div>
      
    </footer>
  );
}

export default Footer;