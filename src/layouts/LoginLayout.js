import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import LoadingElement from "../components/common/LoadingElement";
import { useSelector } from "react-redux";

const LoginLayout = ({ children }) => {
  const selectLoading = (state) => state.loading;
  const loading = useSelector(selectLoading);
  return (
    <Container className="bg-primary w-full h-screen" maxWidth="2xl">
      <Stack spacing={2}>
        {children}
        {loading && <LoadingElement />}
      </Stack>
    </Container>
  );
};
export default LoginLayout;
