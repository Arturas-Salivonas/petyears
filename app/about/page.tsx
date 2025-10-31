import StaticPage from '../../components/StaticPage';

export default function About() {
  return (
    <StaticPage title="About PetYears.net">
      <p>
        Welcome to PetYears.net, your go-to resource for understanding and calculating your pet's age in human years.
        Whether you have a loyal dog or a curious cat, our tools help you bridge the gap between pet and human aging.
      </p>

      <h2>Our Mission</h2>
      <p>
        At PetYears.net, we believe that pets are family. Our mission is to provide accurate, easy-to-use tools
        that help pet owners better understand their furry companions' life stages and health needs.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Precise age conversion calculators for dogs and cats</li>
        <li>Educational content about pet aging and care</li>
        <li>Blog posts with tips and insights from pet experts</li>
        <li>Free tools with no registration required</li>
      </ul>

      <h2>Why Choose Us?</h2>
      <p>
        Our calculators are based on the latest scientific research and veterinary recommendations.
        We focus on accuracy, simplicity, and user experience to make pet age conversion as straightforward as possible.
      </p>

      <p>
        All calculations are performed locally in your browser, ensuring your privacy and data security.
        No personal information is collected or stored.
      </p>
    </StaticPage>
  );
}