const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; Adama Walters {year} </p>
      <p>
        <a href="https://www.flaticon.com/free-icons/vinyl" title="vinyl icons">
          Vinyl icons created by Freepik - Flaticon
        </a>
      </p>
    </footer>
  );
};

export default Footer;
