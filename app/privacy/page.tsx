import StaticPage from '../../components/StaticPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PetYears.net',
  description: 'Our privacy policy explains how we protect your data when using PetYears.net.',
  alternates: {
    canonical: 'https://petyears.net/privacy',
  },
};

export default function Privacy() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        At PetYears.net, we are committed to protecting your privacy. This privacy policy explains how we collect,
        use, and safeguard your information when you use our website and services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We do not collect any personal information from our users. Our age calculators work entirely in your browser,
        and no data is transmitted to our servers. We do not use cookies, tracking pixels, or any other form of data collection.
      </p>

      <h2>How We Use Information</h2>
      <p>
        Since we don't collect any personal information, we don't use or share any data. All calculations are performed
        locally on your device, ensuring complete privacy and security.
      </p>

      <h2>Data Security</h2>
      <p>
        Your privacy is our top priority. By design, our website doesn't store or process any personal data,
        eliminating the risk of data breaches or unauthorized access.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services for website analytics and performance monitoring, but these services
        are configured to respect your privacy and do not collect personal information.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page,
        and we encourage you to review this policy periodically.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us through our website.
      </p>
    </StaticPage>
  );
}