import NewsAddHeader from '@/components/newsadd/NewsAddHeader';
import { useState } from 'react';

export default function NewsAddPage() {
  type Mode = 'publication' | 'text';
  const [mode, setMode] = useState<Mode>('publication');

  return (
    <div>
      <NewsAddHeader mode={mode} setMode={setMode} />
      {/* {mode === 'publication' && </>}
      {mode === 'text' && </>} */}
    </div>
  );
}
