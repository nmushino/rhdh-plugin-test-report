import React, { useEffect, useState } from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';

const BASE_DOMAIN = 'apps.ocp.mnlq9.sandbox1332.opentlc.com';
const NAMESPACE = 'quarkusdroneshop-cicd';

function getTestReportUrl(entityName: string): string {
  const appName = entityName.replace(/^quarkusdroneshop-/, '');
  return `http://${appName}-test-report-${NAMESPACE}.${BASE_DOMAIN}`;
}

export const TestReportContent = () => {
  const { entity } = useEntity();
  const [available, setAvailable] = useState<boolean | null>(null);
  const reportUrl = getTestReportUrl(entity.metadata.name);

  useEffect(() => {
    setAvailable(null);
    fetch(reportUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(() => setAvailable(true))
      .catch(() => setAvailable(false));
  }, [reportUrl]);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '16px' }}>テストレポート</h2>

      <div style={{
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '24px',
        wordBreak: 'break-all',
      }}>
        <strong>URL: </strong>
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">
          {reportUrl}
        </a>
      </div>

      <a
        href={reportUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#1976d2',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        テストレポートを開く ↗
      </a>

      {available === false && (
        <p style={{ marginTop: '16px', color: '#888' }}>
          ※ テストレポートがまだ生成されていないか、サービスが起動していない可能性があります。
        </p>
      )}

      <div style={{ marginTop: '32px' }}>
        <p style={{ color: '#555', fontSize: '13px' }}>
          ※ セキュリティポリシー（Mixed Content）のため、HTTPS の RHDH ページ内に
          HTTP のテストレポートを直接埋め込むことができません。<br />
          上のボタンから新しいタブで開いてください。
        </p>
      </div>
    </div>
  );
};
