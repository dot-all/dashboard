import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Download from '../pages/Download';
import Layout from '../layouts/Layout';
import ChargeRefund from '../pages/ChargeRefund';
import Refund from '../pages/Refund';

const AppRouter = () => {
  return (
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
            <Route path="/charge-refund" element={<ChargeRefund />} />
            <Route path="/refund" element={<Refund />} />
          </Routes>
        </Layout>
      </HashRouter>
  );
};

export default AppRouter;
