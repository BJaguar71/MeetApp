import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// tells enzyme to use the adapter for react 17
Enzyme.configure({ adapter: new Adapter() });