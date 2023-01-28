import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm i react-router-dom
import RankingForm from './components/B6304577/ReviewOrders/RatingForm';
import Payment from './components/B6308490/Payment/Payment';
import EditPayment from './components/B6308490/Payment/EditPayment';
import PaymentShow from './components/B6308490/Payment/PaymentShow';
import OrderTech from './components/B6310646/UIOrderTech';
import PayTech from './components/B6310646/UIPayTech';
import AddressCreateForm from './components/B6321765/Address/AddressCreate';
import AddressShowForm from './components/B6321765/Address/AddressShow';
import AddressEditForm from './components/B6321765/Address/AddressEdit';
import OrderCreate from './components/B6304508/Order';
import ClaimForm from './components/B6304577/ClaimOrders/ClaimForm';
import ClaimOrderForAdmin from './components/B6304577/ClaimOrders/ClaimOrderForAdmin';
import DeviceCreateForm from './components/B6321765/Device/DeviceCreate';
import DeviceEditForm from './components/B6321765/Device/DeviceEdit';
import DeviceShowForm from './components/B6321765/Device/DeviceShow';
import OrderUpdate from './components/B6304508/UpdateOrder';
import ShowOrder from './components/B6304508/ShowOrder';
import RefundCreate from './components/B6304508/Refund';
import RefundShow from './components/B6304508/ShowRefund';
import CreateForm from './components/B6311117/Customer/CreateForm';
import CreateForm2 from './components/B6311117/Customer/CustomerForm2';
import CreateFormTech from './components/B6311117/Technician/CreateFormTech';
import CreateTechnician2 from './components/B6311117/Technician/CreateFromeTechnician2';
import Checked_paymentShow from './components/B6308490/Checked_payment/Checked_paymentShow';
import Checked_payment from './components/B6308490/Checked_payment/Checked_payment';
import Edit_Checked_payment from './components/B6308490/Checked_payment/Edit_Checked_payment';
import LoginCustomer from './components/LoginCustomer';


function App() {
  return (
    <Router>
      <Routes>
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/" element={<LoginCustomer />} /> 
        {/* <Route path="/" element={<PaymentShow />} />  */}
        {/* ทดสอบหน้า fontent ที่นี่ */}
        <Route path="/ContentClaimOrder" element={<ClaimForm />} />
        <Route path="/ClaimOrderForAdmin" element={<ClaimOrderForAdmin />} />
        <Route path="/RankingForm" element={<RankingForm />} />
        <Route path="/OrderCreate" element={<OrderCreate />} />
        <Route path="/OrderUpdate" element={<OrderUpdate />} />
        <Route path="/ShowOrder" element={<ShowOrder />} />
        <Route path="/PaymentShow" element={<PaymentShow />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/EditPayment" element={<EditPayment />} />
        <Route path="/Checked_paymentShow" element={<Checked_paymentShow />} /> 
        <Route path="/Checked_payment" element={<Checked_payment />} /> 
        <Route path="/EditChecked_payment" element={<Edit_Checked_payment />} /> 
        <Route path="/AddressCreatePage" element={<AddressCreateForm />} />
        <Route path="/AddressShowPage" element={<AddressShowForm/>} />
        <Route path="/AddressEditPage" element={<AddressEditForm/>} />
        <Route path="/DeviceCreatePage" element={<DeviceCreateForm/>} />
        <Route path="/DeviceEditPage" element={<DeviceEditForm/>} />
        <Route path="/DeviceShowPage" element={<DeviceShowForm/>} />
        <Route path="/RefundCreate" element={<RefundCreate />} />
        <Route path="/RefundCreate" element={<RefundShow />} />
        <Route path="/OrderTech" element={<OrderTech />} /> 
        <Route path="/PayTech" element={<PayTech />} /> 
        <Route path="/CustomerCreate" element={<CreateForm />} /> 
        <Route path="/CustomerShow" element={<CreateForm2 />} /> 


        <Route path="/TechnicianCreate" element={<CreateTechnician2 />} /> 
        <Route path="/TechnicianShow" element={<CreateFormTech />} /> 
      </Routes>
    </Router>
  );
}

export default App;
