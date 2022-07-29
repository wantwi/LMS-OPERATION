import React, { useState, useEffect } from "react";
import { Input, Col, Row } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledCollapse,
  CardBody,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { dateTemplate } from "util/helper";
import classnames from "classnames";
import useAuth from "hooks/useAuth";

const { REACT_APP_SERVICE_URL } = process.env;

// const sessionData = JSON.parse(sessionStorage.getItem("oidc.user:https://demo.persol-apps.com/lms.auth:lms-job-manager_client"));

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ListingTypeForm = ({
  metata,
  handleSubmit,
  submitBtn,
  requriementName,
  inputFile,
  addNew,
  setAddNew,
  prevMetaData,
  // setIsOpen,
}) => {
  const { metadata, jobNumber, documentType } = metata;
  const [prev, setPrev] = useState(false);
  const [src, setsrc] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setloading] = useState(false)
  const {auth} = useAuth()
  let init = {};
  metadata.forEach((x) => {
    init[`${x.label}`] = "";
  });
  init.file = "";

  let schemaOpt = {};
  metadata.forEach((x) => {
    schemaOpt[`${x.label}`] =
      x.inputType.toLowerCase === "date"
        ? Yup.date().required(`${x.label} is required`)
        : x.inputType.toLowerCase === "number"
        ? x.isRequired ? Yup.number().required(`${x.label} is required`) : Yup.number()
        : x.isRequired ? Yup.string().required(`${x.label} is required`):  Yup.string();
  });

  schemaOpt.file = Yup.string().required(`Document is required`);

  const schema = Yup.object().shape(schemaOpt);

  const handlePreview = async () => {
    const img = await getBase64(inputFile.current.files[0]);

    if (img) {
      setsrc(img);
      setPrev(true);
    }
  };

  const getDoc = (fileReferenceId) => {
    setloading(true)
    fetch(`${REACT_APP_SERVICE_URL}download/${fileReferenceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((res) => res.blob())
      .then((data) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data);
        link.download = `_${documentType}.pdf`;
        link.click();
        setloading(false)
      }).catch(err =>{
        setloading(false)
      })
  };

  useEffect(() => {}, [metata]);


  console.log({ prevMetaData,loading });

  const MetaDataForm = () => {
    return (
      <>
        <Formik
          hidden
          initialValues={init}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, touched }) => (
            <Form encType="multipart/form-data">
              <div
                style={{
                  borderRadius: 10,
                  height: "auto",
                  background: "#ebebeb",
                  padding: "10px",
                }}
              >
                <Row>
                  <Col md={5}>
                    <label>
                      Attach Document <span className="isRequire">*</span>
                    </label>
                    <br />
                    <input
                      disabled={documentType === "No Document" ? true : false}
                      ref={inputFile}
                      type="file"
                      name="file"
                      onChange={handleChange}
                      value={values.file}
                      className={errors.file && touched.file ? "invalid" : ""}
                    />
                    {errors.file && touched.file && (
                      <div className="text-danger">{errors.file}</div>
                    )}
                  </Col>
                  <Col md={7}>
                    <div
                      style={{
                        background: "#e1e2e3",
                        padding: "10px 20px",
                        borderRadius: 10,
                      }}
                    >
                      <label className="mr-1">Job Number : </label>
                      <span>{jobNumber}</span>
                      <br />
                      <label className="mr-1">Requirement : </label>
                      <span>{requriementName}</span>
                      <br />
                      <label className="mr-1">Document Type :</label>
                      <span>{documentType}</span>
                      <br />
                    </div>
                  </Col>
                </Row>
              </div>

              {metadata.map((x, i) => {
                const { inputType, isRequired, label: lb } = x;

                return (
                  <>
                    <Row key={i} className="mt-2" form>
                      <Col md={5}>
                        <label>
                          {lb}{" "}
                          {isRequired ? (
                            <span className="isRequire">*</span>
                          ) : null}
                        </label>
                      </Col>
                      <Col md={7}>
                        <Input
                          name={lb}
                          type={`${inputType.toLowerCase()}`}
                          placeholder="Enter data"
                          onChange={handleChange}
                          value={values[`${lb}`]}
                          className={
                            errors[`${lb}`] && touched[`${lb}`] ? "invalid" : ""
                          }
                        />
                        {errors[`${lb}`] && touched[`${lb}`] && (
                          <div className="text-danger">{errors[`${lb}`]}</div>
                        )}
                      </Col>
                    </Row>
                  </>
                );
              })}

              <button hidden ref={submitBtn} type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
        <Modal isOpen={prev} size="xl">
          <ModalHeader>
            <span className="mb-3" style={{ fontWeight: 900 }}>
              Preview Document
            </span>
          </ModalHeader>
          <ModalBody>
            <img
              data={src}
              style={{ minHeight: 500 }}
              type="application/docx"
            />
          </ModalBody>
          <ModalFooter>
            <Button className="c-secondary" onClick={() => setPrev(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const FormDetails = (prop) =>{


    const {
      documentType,
      fileReferenceId,
      id,
      jobActivityName,
      metadata,
    } = prop.prop;

  
    return(
      <Card>
      <CardBody>
        <div
          style={{
            borderRadius: 10,
            height: "auto",
            background: "#ebebeb",
            padding: "10px",
          }}
        >
          <Row>
            <Col md={5}>
              <label>
                Attach Document <span className="isRequire">*</span>
              </label>
              <br />

              <Button
                disabled={documentType === "No Document" ? true : false}
                type="button"
                onClick={() => getDoc(fileReferenceId)}
                className="c-info mt-2"
                style={{ width: "100%" }}
              >
                Download
              </Button>
            </Col>
            <Col md={7}>
              <div
                style={{
                  background: "#e1e2e3",
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                <label className="mr-1">Job Number : </label>
                <span>{jobNumber}</span>
                <br />
                <label className="mr-1">Requirement : </label>
                <span>{jobActivityName}</span>
                <br />
                <label className="mr-1">Document Type :</label>
                <span>{documentType}</span>
                <br />
              </div>
            </Col>
          </Row>
        </div>

        {metadata.map((x, i) => {
          const { inputType, isRequired, label: lb } = x;
          
          return (
            <>
              <Row key={i} className="mt-2" form>
                <Col md={5}>
                  <label>
                    {lb}{" "}
                    {isRequired ? (
                      <span className="isRequire">*</span>
                    ) : null}
                  </label>
                </Col>
                <Col md={7}>
                  {inputType === "Date" ? (
                    <div style={style}>{dateTemplate(x.value)}</div>
                  ) : (
                    <Input
                      disabled
                      name={lb}
                      type={
                        inputType === "Date" ? "text" : `${inputType}`
                      }
                      placeholder="Enter data"
                      value={x.value}
                    />
                  )}
                </Col>
              </Row>
            </>
          );
        })}
      </CardBody>
    </Card>
    )

  }

  const TabView = () => {
    return (
      <>
        <Nav tabs>
          {prevMetaData.map((x, i) => (
            <NavItem key={`Nav_${i}`}>
              <NavLink
              style={{background: activeTab === i + 1?"#bcc9dd" :"#fff", color: "black"}}
                className={classnames(
                  { active: activeTab === i + 1 },
                  "doc-title"
                )}
                onClick={() => toggle( i + 1)}
              >
                Document {i + 1}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
        {
          prevMetaData.map((x,i) =><TabPane tabId={i+1}> <FormDetails prop = {x}/>  </TabPane>)
        }
        </TabContent>
      </>
    );
  };

  return (
    <>
      <Row hidden={addNew ? true : false}>
        <Col md={8} xs={12}>Job Number: <span style={{fontWeight:"bold"}}>{jobNumber}</span></Col>
        <Col md={4} xs={12}>
          <Button
            style={{ float: "right" }}
            className="c-success"
            onClick={() => setAddNew(true)}
          >
            Add New Document
          </Button>
        </Col>
      </Row>

      {!addNew ? (
        <>
          {prevMetaData.length === 0 ? (
            <h5>No previous upload</h5>
          ) : (
            <TabView />
          )}
        </>
      ) : null}

      {addNew ? <MetaDataForm /> : null}
    </>
  );
};

export default ListingTypeForm;
const style = {
  border: "1px solid rgb(209, 210, 211)",
  padding: "5px 10px",
  fontSize: "12px",
  borderRadius: "5px",
  background: "#e9ecef",
  border: "1px solid #d1d2d3",
  color: "#495057",
};
