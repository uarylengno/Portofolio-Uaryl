const fs = require('fs');
let content = fs.readFileSync('src/components/portfolio-sections.tsx', 'utf-8');

content = content.replace(
  `import { APP_CONFIG } from '../appConfig';`,
  `import { APP_CONFIG } from '../appConfig';\nimport { APP_CONFIG_EN } from '../appConfigEn';\nimport { useLanguage } from '../contexts/LanguageContext';`
);

content = content.replace(
  `export function Certificates() {`,
  `export function Certificates() {\n  const { language, t } = useLanguage();\n  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;`
);

content = content.replace(
  `{APP_CONFIG.certificates.map(`,
  `{config.certificates.map(`
);

content = content.replace(
  `Bukti dedikasi dan pengembangan diri berkelanjutan di bidang teknologi dan desain. Klik sertifikat untuk melihat detail.`,
  `{t("Bukti dedikasi dan pengembangan diri berkelanjutan di bidang teknologi dan desain. Klik sertifikat untuk melihat detail.", "Proof of dedication and continuous self-development in technology and design. Click on a certificate to view details.")}`
);

fs.writeFileSync('src/components/portfolio-sections.tsx', content);
