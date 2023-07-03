import React from "react";
import { saveAs } from "file-saver";
import  JSZip  from 'jszip'
import {
  ComponentTitle,
  HeadComponent,
  NavBtn,
  TableData,
  TableTitle,
  Title,
} from "../../Styles/CommonStyles";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleOrderAction,
  getSingleOrderAdminAction,
} from "../../Redux/actions";
import { useParams , useNavigate  } from "react-router-dom";
import { useEffect } from "react";
// import Layout from "../Layout/Layout";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import DateAndTime from "../Admin/AdminOrderDetails/DateAndTime";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const UserSingleProduct = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const fetch = async () => {
    const res = await dispatch(getSingleOrderAction(id));
    // console.log(res);
  };
  const { loading, orders } = useSelector(
    (state) => state.GetSingleOrdersReducer
  );
  console.log(orders?.data?.order);
  useEffect(() => {
    fetch();
  }, []);


  const downloadImage = () => {
   
  
    orders?.data?.order?.orderItems.forEach((data, index) => {
      
      fetch(data.image)
        saveAs(data.image)
        // .then((response) => response.blob())
        // .then((blob) => {
          
        //   const filename = `image${index + 1}.png`;
        //   zip.file(filename, blob);
  
        //   if (index === orders?.data?.order?.orderItems.length - 1) {
        //     zip.generateAsync({ type: 'blob' }).then((content) => {
        //       saveAs(content, 'products.zip');
        //     });
        //   }
        // })
    });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: "64px" }}>
        <HeadComponent>
          <NavBtn sx={{ mb: 2 }} onClick={() => { navigate('/userOrders') }}  >Back</NavBtn>
          {/* <Typography sx={{ mb: 2 }}>Orders</Typography> */}
          {/* <ComponentTitle sx={{ mb: 2 }}>Order Details</ComponentTitle> */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <Box
              sx={{
                "& > button": {
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <ComponentTitle sx={{ marginY: 4 }}>Order Details</ComponentTitle>
              {/* <Typography sx={{ mb: 2 }}>Order Details</Typography> */}
              <Grid
                container
                rowGap={1}
                columnGap={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& > div": {
                    background: "#2B2B2B",
                    minHeight: "168px",
                    maxHeight: "228px",
                    borderRadius: "10px",
                    p: "10px",
                  },
                  "& > div > p:first-child": {
                    marginBottom: "30px",
                  },
                }}
              >
                <Grid item xs={12} sm={5.8} md={2.9} lg={2.9}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600, color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Customer
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.user?.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.user?.email}
                  </Typography>
                  {/* <Typography sx={{ fontWeight: 600 }}>
                USA, Virginia 34900
              </Typography> */}
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600, color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Shipping to:
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.shippingInfo?.address}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.shippingInfo?.city}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.shippingInfo?.state},
                    {orders?.data?.order?.shippingInfo?.country}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600, color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Payment Method:
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    Cryptocurrencies
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600, color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Order Date
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    <DateAndTime date={orders?.data?.order?.createdAt} />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600,color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Order Status
                  </Typography>

                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    {orders?.data?.order?.orderStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.8} md={2.8} lg={2.8}>
                  <Typography sx={{ textAlign: "center", fontWeight: 600, color: "#00f902", borderBottom: "1px solid white", pb: "5px" }}>
                    Expected Delivery
                  </Typography>
                  <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
                    <DateAndTime
                      date={orders?.data?.order?.expectedDeliveryDate}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  background: "#2b2b2b",
                  mt: 2,
                  p: 2.5,
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ display: "flex", borderBottom: "1px solid white" }}>
                  <TableTitle sx={{
                    color: "#00f902"
                  }}>#</TableTitle>
                  <TableTitle
                  sx={{
                    color: "#00f902"
                  }}
                  >IMAGE</TableTitle>
                  <TableTitle
                  sx={{
                    color: "#00f902"
                  }}
                  >PRODUCT</TableTitle>
                  <TableTitle sx={{ ml: "auto", color: "#00f902" }}>TOTAL</TableTitle>
                </Box>
                {orders?.data?.order?.orderItems.map((data, index) => (
                  <Box sx={{ display: "flex", mt: 1.5 }} key={index}>
                    <TableData>{index + 1}</TableData>
                    <img
                      src={data.image}
                      alt='pic'
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                        marginRight: "34px",
                      }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TableData sx={{ fontSize: "14px" }}>
                        {data.name}
                      </TableData>
                      <TableData sx={{ fontSize: "14px" }}>
                        Quantity:{data.quantity}
                      </TableData>
                    </Box>
                    <TableData sx={{ ml: "auto" }}>{data.price}£</TableData>
                  </Box>
                ))}
              </Box>
              {orders?.data?.order?.orderStatus === 'delivered' ? (
              <NavBtn sx={{ margin: "20px auto 0px auto" }} onClick={downloadImage}>
                Download
              </NavBtn>
            ) : null}
            </Box>
          )}
        </HeadComponent>
      </Box>
      <Footer />
    </>
  );
};

export default UserSingleProduct;
