import React, { useState, useEffect } from "react";
import { myContext } from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  getDocs
} from "firebase/firestore";
import { fireBD } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";


export const MyState = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ********Add Product Section***********
  const addProduct = async () => {
    if (
      products.title == "" ||
      products.price == "" ||
      products.imageUrl == "" ||
      products.category == "" ||
      products.description == ""
    ) {
      return toast.error("Please fill all fields");
    }

    // const productRef = collection(fireBD, "products");
    setLoading(true);

    try {
      const productRef = collection(fireBD, "products");
      await addDoc(productRef, products);
      toast.success("Add product successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ********Get Product*******

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireBD, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

 

  // ****** Update and Delete*****
  const edithandle = (item) => {
    setProducts(item);
  };
  // update product
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireBD, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireBD, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      toast.success('Product Deleted Falied');
      console.log(error);
      setLoading(false);
    }
  };


  // orders
  // const [order, setOrder] =useState( {
  //   name : '',
  //   pin : '',
  //   mobile : '',
  //   address : '',
  //   time: Timestamp.now(),
  //   date: new Date().toDateString("en-US", {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   })
  // }
  // );

  const [order, setOrder] = useState([]);
  // get oders 
  const getOrderData = async() =>{
    setLoading(true);
    try {
      const result = await getDocs(collection(fireBD, 'orders'));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      
      })
      setOrder(ordersArray);
      // console.log(order);
      // return ordersArray;
      
    } catch (error) {
      console.log(error);
      toast.error('Something is wrong in getOrderData');
    }
  } 


  // users
  const [user, setUser] = useState([]);

  const getUserDate = async () => {
    setLoading(true);
    try {
      const userArray = [];
      const result = await getDocs(collection(fireBD, 'users'));
      result.forEach((doc) => {
        userArray.push(doc.data());
        setLoading(false);
      })
      // console.log(userArray);
      setUser(userArray);
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error("Something is wrong with GetUserDate");
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserDate();
  }, []);

  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        deleteProduct,
        updateProduct,
        getOrderData,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice
      }}
    >
      {children}
    </myContext.Provider>
  );
};
