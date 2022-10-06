import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash,faEye, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Accordion, Card, Button } from "react-bootstrap";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
/* global chrome */
const Modal = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userdata, setUserData] = useState([]);
  const [articles, setArticle] = useState([]);
  const [checkLogin, setLogin] = useState(false);

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [titleStatus, setTitleStatus] = useState(false);

  const [articleID, setArticleId] = useState('');

  const [value, setValue] = useState('');
  const [titleSuggestion, setTitleSuggestion] = useState([]);
  const [imageSuggestion, setImageSuggestion] = useState([]);
  const [image, setImage] = useState('');

  const [updateId, setUpdateId] = useState('');
  const [updateComment, setUpdateComment] = useState('');

  const [updateBtn, setUpdateBtn] = useState(false);
  const [statusBtn, setStatusBtn] = useState(false);

  const [statusCheckBtn, setStatusCheckBtn] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [createStatus, setCreateStatus] = useState('');
  const [postcreateStatus, setPostCreateStatus] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [scrapFlag, setScrapFlag] = useState('');
  const [articleFlag, setArticleFlag] = useState(false);

  const [loginClickStatus, setLoginClickStatus] = useState(false);
  const [loginFlag, setLoginFlag] = useState('');

  const [myIP, setMyIP] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [commentUpdateCount, setCommentUpdateCount] = useState(0);
  const [expertName, setExpertName] = useState('');
  const [attrPassword, setAttrPassword] = useState('password');
  const [location,setCurrentLocation] = useState('');

 

  const handleUserChange = ({ target }) => {
    setUser(target.value);
    console.log('======>', username);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
    console.log('======>', title);
  };

  const handleCommentChange = ({ target }) => {
    setComment(target.value);
    setCommentCount(target.value.length);
    console.log('======>', comment);
  };


  const SubmitData = (e) => {
    e.preventDefault();
    userAuthenticate();
  }

  const SubmitArticle = (e) => {
    e.preventDefault();
    postArticle();
    setTitle('');
    setTitleSuggestion([]);
    setImageSuggestion([]);
  }

  const backHome = (e) => {
    e.preventDefault();
    setTitle('');
    setTitleSuggestion([]);
    setImageSuggestion([]);
  }

  

  const handleClick1 = event => {
    setTitleStatus(true);
    console.log('====>>>>>>>>>>>>', titleStatus);
    articleList();
  }

  const handleClick2 = event => {
    setTitleStatus(false);
    console.log('====>>>>>>>>>>>>', titleStatus);
  }



  useEffect(() => {
    // let data = JSON.parse(localStorage.getItem('plugin_user'));
    let data = cookies.get('plugin_user');
    setUserData(data);
    if (cookies.get('plugin_user')) {
      setLogin(true);
      setExpertName(data.data.first_name+' '+data.data.last_name);
    }else {
      getIP();
    }
    getMyIP();
  }, []);



  const getMyIP = async () => {
    try {
        const url = "https://ifconfig.co/ip";
        const result = await axios.get(url)
        console.log('===---MYIP---=====-----===>', result.data);
        setMyIP(result.data);
      } catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
      }
  }

  const getIP = async () => {
    try {
        const url = "https://frontpagebydf.com/Api/getFetchIP";
        const result = await axios.get(url)
        console.log('===------=====-----===>', result.data.data);
        setUserData(result.data);
        localStorage.setItem('plugin_user', JSON.stringify(result.data));
        console.log('=======>>>>', JSON.parse(localStorage.getItem('plugin_user')));
        setLogin(true);
        console.log(userdata);
      } catch (error) {

        console.log(`😱 Axios request failed: ${error}`);
        // console.log(error.response.status);
  
      }
  }

  let expert = JSON.parse(localStorage.getItem('plugin_user'));
  let formDataLogout = new FormData();
  
  
  const logoutUser = async () => {
    try {
      formDataLogout.set('expert_id', expert.data.expert_id);
      const url = "https://frontpagebydf.com/Api/expertRemoveIP";
      const result = await axios.post(url, formDataLogout, config)
      console.log('===------=====-----===>', result.data.data);
  
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
      // console.log(error.response.status);
    }
  }

  
  let formData = new FormData();

  formData.set('email', username);
  formData.set('password', password);
  formData.set('my_ip', myIP);


  const userAuthenticate = async () => {
    try {
      setLoginFlag('');
      setLoginClickStatus(true);
      const url = "https://frontpagebydf.com/Api/expertLogin";
      console.log(formData.get('email'));
      const result = await axios.post(url, formData)
      console.log(result.data);
      setUserData(result.data);
      // localStorage.setItem('plugin_token',result.data.token);
      // localStorage.setItem('plugin_user', JSON.stringify(result.data));
      cookies.set('plugin_user', JSON.stringify(result.data), { path: '/' });
      setLogin(true);
      let cookie_data = cookies.get('plugin_user');
      setExpertName(cookie_data.data.first_name+' '+cookie_data.data.last_name);
      console.log(userdata);
      setLoginClickStatus(false);

    } catch (error) {
      setLoginFlag('Invalid email or password.');
      setLoginClickStatus(false);
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }

  }
  const config = {
    headers: { 'Token': userdata ? userdata.token : '' }
  }
  
  let website_url = window.location.href;
  let imageValue;
  
  const handleImageChange = ({ target }) => {
    imageValue = target.value;
    console.log('Image value======>', imageValue);
    setImage(target.value);
  };
    
    // let login_user = JSON.parse(localStorage.getItem('plugin_user'));
    let login_user = cookies.get('plugin_user');
    let formData1 = new FormData();
    formData1.set('news_heading', title);
    formData1.set('expert_review', comment);
    formData1.set('image', image);
    formData1.set('news_url', website_url);
    if(login_user) {
      formData1.set('category_id', login_user.data.category_id );
    }
  
  

  const postArticle = async () => {
    try {
      if(formData1.get('news_heading') === '' || formData1.get('expert_review') === '') {
          setCreateStatus("Please fill the title and comment fields");
      }
      else {
          setPostCreateStatus(true);
          chrome.tabs.query(
            {
                currentWindow: true,   
                active: true  
            },
            async function (foundTabs) {
                if (foundTabs.length > 0) {
                    var current_url = foundTabs[0].url;     
                    const url = "https://frontpagebydf.com/Api/postArticle"; // site that doesn’t send Access-Control-*
                    formData1.set('news_url', current_url);
                    const result = await axios.post(url, formData1, config)
                    console.log(result.data);
                    setCreateStatus(result.data.data);
                    setTitle('');
                    setComment('');
                    tweetPostArticle();
                    setPostCreateStatus(false);      
                } else {
                    // there's no window or no selected tab
                }
            }
        );   
          
      }

    } catch (error) {
      setPostCreateStatus(false);
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }

  let formDataTweet = new FormData();
    formDataTweet.set('comment', comment+' https://cutt.ly/Ek5wvQv');

  const tweetPostArticle = async () => {
    try {
      const url = "https://frontpagebydf.com/Api/tweetPost"; // site that doesn’t send Access-Control-*
      console.log(formData1.get('news_heading'));
      const result = await axios.post(url, formDataTweet, config)
      console.log(result.data);
    
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }


  const articleList = async () => {
    const url = "https://frontpagebydf.com/Api/getArticles";
    const result = await axios.get(url, config)
    console.log('===------=====-----===>', result.data.data);
    setArticle(result.data.data.articles);
    //setTotalDocs(result.data.length);
  }



  const scrapData = async () => {
    setScrapFlag('Please wait...');
   
    chrome.tabs.query(
      {
          currentWindow: true,   
          active: true  
      },
      function (foundTabs) {
          if (foundTabs.length > 0) {
              var current_url = foundTabs[0].url;     
              webScrap(current_url)         
          } else {
              // there's no window or no selected tab
          }
      }
  );   

  }

  const webScrap = async (current_url) =>{
    let formData2 = new FormData();
    formData2.set('url', current_url);
    try {
      const url = "https://frontpagebydf.com/Api/webScrap"; // site that doesn’t send Access-Control-*
      console.log(formData2.get('news_heading'));
      const result = await axios.post(url, formData2, config)
      console.log(result.data);
      setTitle(result.data.title[0]);
      setTitleSuggestion(result.data.title);
      // setImageSuggestion(result.data.image);
      
      // Change 20-06-2022
      setImageSuggestion([]);
      console.log('=======>', result.data.title[0]);
      console.log('*******=======>', titleSuggestion);
      setScrapFlag('');

    } catch (error) {
      setScrapFlag('Something went wrong.!');
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }


  const handleClick = event => {
    let articleId = event.target.dataset.id;
    setArticleId(articleId);
    console.log('articleId ====>', articleId);
  }

  const handleLogout = event => {
    logoutUser();
    // localStorage.removeItem("plugin_user");
    cookies.remove("plugin_user");
    setLogin(false);

  }

  

  const updateCommentList = ({ target }) => {
    console.log('======>', target.value);
  };

  const selectTitle = event => {
    let articleId = event.target.dataset.id;
    setArticleId(articleId);
    console.log('articleId ====>', articleId);
  }



  const updateArticle = async () => {
    try {
      const url = "https://frontpagebydf.com/Api/updateArticleStatus";
      const result = await axios.post(url, formData2, config)
      console.log('--------->',result.data);
      


    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }

  const handleCommentUpdate = ({ target }) => {
    setUpdateComment(target.value);
    setCommentUpdateCount(target.value.length)
    console.log('======>', updateComment);
  };


  const updateArticleList = async () => {
    setUpdateFlag(true);
    // let expert = JSON.parse(localStorage.getItem('plugin_user'));
    let expert =cookies.get('plugin_user');
    let formData3 = new FormData();
    formData3.set('expert_id', expert.data.expert_id);
    formData3.set('article_id', updateId);
    formData3.set('comment', updateComment);
    try {
      const url = "https://frontpagebydf.com/Api/updateArticle"; 
      const result = await axios.post(url, formData3, config)
      console.log(result.data);
      setUpdateStatus(result.data.data);
      console.log('updateID=======>',updateId);
      console.log('updateComment=======>',updateComment);
      setUpdateFlag(false);


    } catch (error) {
      setUpdateFlag(false);
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }



  let formData4 = new FormData();
  const selectArticleOption = ({ target }) => {
    if(target.value !== ''){
      setUpdateId(target.value);
      let article_id = updateId; 
      console.log('###_Article_id====>',target.value);
      // let expert = JSON.parse(localStorage.getItem('plugin_user'));
      let expert = cookies.get('plugin_user')
      formData4.set('expert_id', expert.data.expert_id);
      formData4.set('article_id', target.value);
      setUpdateStatus('');
      getArticleData();
    }
  };


  
  const getArticleData = async () => {
    
    try {
      setArticleFlag(true);
      const url = "https://frontpagebydf.com/Api/getArticleById"; // site that doesn’t send Access-Control-*
      const result = await axios.post(url, formData4, config);
      let test = result.data.data.articles;
      console.log('000000000===>',test);
  
      // if(result.data.data.articles[0]){
        let com = test.expert_review;
        setUpdateComment(com);
        setCommentUpdateCount(com.length);
        let PostImg = test.image;
        setUpdateImage(PostImg);
        console.log('*******####-----=======>',updateImage);
        // if(result.data.data.articles[0].status){
          setStatusCheckBtn(result.data.data.articles.status);
      //   }
      // }
      setUpdateBtn(true);
      setStatusBtn(true);
      setArticleFlag(false);
      
      console.log('updateID=======>',updateId);
      console.log('get Article detail=======>',result.data);


    } catch (error) {
      setArticleFlag(false);
      console.log(`😱 Axios request failed: ${error}`);
      //setMessage(error.response.data.message);
      // console.log(error.response.status);

    }
  }

  let formData2 = new FormData();

  const handleStatus = event => {
    let expert = JSON.parse(localStorage.getItem('plugin_user'));
    let articleId = updateId;
    let expertId = expert.data.expert_id;
    let status = event.target.dataset.status;
    if (status === "1") { status = "0"; }
    else { status = "1"; }

    formData2.set('expert_id', expertId);
    formData2.set('article_id', articleId);
    formData2.set('status', status);

    updateArticle();
    articleList();
    setStatusCheckBtn(status);
  }


  const actionPassword = () =>{
    (attrPassword=='password')?setAttrPassword('text'):setAttrPassword('password');
  }

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, extensionId, getExtensionId }) => (
        <Draggable
          handle=".modal-handle" disabled={true}
          defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
        >
          <div id="modal" className="modal-window" style={{
            transform: windowPosition,
          }}>
            <div className="modal-window-inner-border">

              <div className="modal-body">
                <div className="modal-handle modal-handle-rs ">

                  <img src={'https://frontpagebydf.com/upload/logo/logo-192.png'} alt="" className="source_image" />

                  {checkLogin === true &&

                    <div className="modal-user">
                     
                      <div className="d-flex align-items-center mt-2">
                        <div className=''>
                          <div className="user_name">
                            <p className="user-name ml-0" title={expertName}>{expertName.length < 10 ? expertName : expertName.substr(0,10)+'...'}</p>
                          <span style={{fontSize:"12px"}}>{userdata.data.category_name}</span>
                          </div>
                        </div>
                        <div className=''>
                       
                        <img src={userdata.data.profile_image_url ? userdata.data.profile_image_url : 'https://frontpagebydf.com/upload/logo/default_expert.png'} alt="" className="user_image user_image-rs" />
                       
                        </div>
                        <div className=''>
                        <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}/>
                        </div>
                        {/* <i className="fa fa-sign-out" title="Logout" id="logout_key" ></i> */}
                      </div>
                      
                    </div>
                  }

                  {/* <div className="modal-close-button">
                    <X color="#5d6484" size="14" />
                  </div> */}
                </div>

                {checkLogin === false &&
                  <div className="modal-content">
                    <div className="login_area" style={{ height: "360px" }}>
                    <div className="form-group" style={{ marginTop: "25px" }}>
                      <div className="alert alert-info">
                        Please login using registered email and password.
                      </div>
                      <label style={{ fontWeight: "600" }}>Email Address</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your email address"
                        style={{ marginTop: "-13px" }}
                        onChange={handleUserChange}
                        value={username}

                      />
                    </div>
                    
                    <div className="form-group">
                    <label style={{ fontWeight: "600" }}>Password</label>
                    <div className="input-group mb-3"  style={{ marginTop: "-13px" }}>
                    
                    <input name="password" type={attrPassword} value={password} className="input form-control" id="password" placeholder="password" required={true} aria-label="password" aria-describedby="basic-addon1" onChange={handlePasswordChange}/>
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={actionPassword}>
                      {(attrPassword=='password')?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye}/>}
                      </span>
                    </div>
                  </div>
                  </div>

                    <div className="row sub_area">
                    <div className="row">
                        <p id="login-msg">{loginFlag}</p>
                    </div>
                      <a onClick={() => { window.open('https://frontpagebydf.com/expert_forget','_blank')}}>
                      <p id="forgot_text">Forgot Password?</p>
                      </a>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="log_submit"
                        onClick={SubmitData}
                      >
                        Login
                        {loginClickStatus === true &&
                          <i className="fa fa-spinner fa-spin" style={{marginLeft : "5px"}}></i>
                        }
                      </button>

                    </div>

                  </div>
                  </div>
                }



                {checkLogin === true &&

                  <div className="modal-content">
                    <div className="header-nav" style={{ marginTop: "90px" }}>
                      <nav>
                        <div className="nav nav-tabs nav-fill sticky" id="nav-tab" role="tablist">

                          <a
                            className={titleStatus === false ? 'nav-item nav-link active' : 'nav-item nav-link'}
                            id="nav-home-tab"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                            onClick={handleClick2}>
                            New Stories</a>
                          <a
                            className={titleStatus === true ? 'nav-item nav-link active' : 'nav-item nav-link'}
                            id="nav-profile-tab"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                            onClick={handleClick1}>
                            All Stories</a>
                        </div>
                      </nav>
                    </div>



                    <div className="form-group">
                      {titleStatus === false &&
                        <div className="post_area" style={{ height: "360px" }}>
                          <div className="alert alert-info">
                            <div className="row">
                              <div className="col-md-12">
                                To capture the title and page content, click this button.
                                <i className="fa fa-arrow-circle-down" aria-hidden="true" onClick={scrapData}></i>
                              </div>
                            </div>
                          </div>

                        { scrapFlag != '' &&
                          <p id="status-msg-set">{scrapFlag}</p>
                        }
                          {(titleSuggestion.length > 0 || imageSuggestion.length > 0) &&
                          <p id="status-msg-set" style={{cursor:"pointer"}} onClick={backHome}><i className="fa fa-chevron-circle-left"></i> Back to home</p>
                          }

                          {titleSuggestion.length > 0 &&
                            <div className="suggestion_area">
                              <div className="form-group">
                                <label style={{ fontWeight: "600" }}>Title Suggestion</label>
                                <select
                                  className="form-control"
                                  onChange={e => setTitle(e.target.value)}
                                  value={title}
                                >
                                  {titleSuggestion.map(titleList => (
                                    <option value={titleList} dangerouslySetInnerHTML={{__html: titleList}}></option>
                                  ))}
                                </select>
                              </div>
                             </div>
                            }
                            
                            {imageSuggestion.length > 0 &&
                              <div className="images-section">
                                <h6>Select Image</h6>
                                <div className="row">

                                  {imageSuggestion.slice(0, 6).map((imageList, index) => (
                                    <div className="col-md-4 col-4 image-group">
                                      <img src={imageList} id="image1" alt="" className="image-select" />
                                      <input
                                        value={imageList}
                                        name="image"
                                        type="radio"
                                        onChange={handleImageChange}
                                      />
                                    </div>
                                  ))}

                                </div>

                              </div>
                            
                          }
                        


                          <label style={{ fontWeight: "600" }}>News Headline</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Click on Headline"
                            style={{ marginTop: "-13px" }}
                            onChange={handleTitleChange}
                            value={title}

                          />

                          <div className="form-group">
                            {/* <div className="row"> */}
                            <label style={{ fontWeight: "600",float: 'left',marginTop:'10px'}}>Your Comment</label>
                            <label style={{marginLeft: "146px", fontSize: "12px", float: 'right',marginTop:'10px'}}>250/{commentCount}</label>
                            {/* </div> */}

                            

                            <textarea
                              className="form-control"
                              value={comment}
                              onChange={handleCommentChange}
                              rows={5}
                              maxLength="250"
                              placeholder="Write your comment on the article."
                              style={{ marginTop: "-13px" }}

                            />
                          </div>

                          <div className="row">
                          <p id="status-msg">{createStatus}</p>
                          </div>
                          <div className="row">
                          {postcreateStatus === false &&
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ background: "#2a7bb8", height: "40px", width: "90%", float: "right", display: "inline-block", marginLeft: "5%" }}
                              onClick={SubmitArticle}
                            >
                              PUBLISH
                          </button>
                          }
                          {postcreateStatus === true &&
                            <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ background: "#2a7bb8", height: "40px", width: "90%", float: "right", display: "inline-block", marginLeft: "5%" }}
                          >
                            PUBLISH
                            <i className="fa fa-spinner fa-spin" style={{marginLeft : "5px"}}></i>
                            </button>
                          }

                          </div>

                        </div>

                      }

                      {titleStatus === true &&


                        <div className="post_list" style={{ height: "360px" }}>
                          <h6 style={{ marginTop: "20px" }} id="status-msg-set">You have submitted {articles.length} articles</h6>

                        
                          <div className="form-group">
                            <label style={{ fontWeight: "600" }}>Article List
                            { articleFlag === true &&
                              <i className="fa fa-spinner fa-spin" style={{marginLeft : "5px"}}></i>
                            } 
                            </label>
                            <select
                              className="form-control"
                              onChange={selectArticleOption}
                              // onChange={e => setUpdateId(e.target.value)}
                              value={updateId}
                            >
                              <option value="">Select Article</option>
                              {articles.map((article,i) => (
                                <option value={article.news_post_id} key={i} dangerouslySetInnerHTML={{__html: article.news_heading}}></option>
                              ))}
                            </select>
                          </div>
                          
                          { updateImage !== '' &&
                          <div className="post-img-area">
                            <img src={updateImage} alt="" className="post-image" />
                          </div>
                          }

                          <div className="form-group">
                            {/* <div className="row"> */}
                            
                            <label style={{ fontWeight: "600",float: 'left',marginTop:'10px'}}>Your Comment</label>
                            <label style={{marginLeft: "146px", fontSize: "12px", float: 'right',marginTop:'10px'}}>250/{commentUpdateCount}</label>


                            {/* </div> */}
                            <textarea
                              className="form-control"
                              value={updateComment}
                              onChange={handleCommentUpdate}
                              rows={5}
                              maxLength="250"
                              placeholder="Write your comment on the article."
                              style={{ marginTop: "-13px" }}
                            />
                            
                          </div>

                          <div className="mt-3">
                          <div className="row">
                          <p id="status-msg">{updateStatus}</p>
                          </div>
                          <div className="row">
                          {statusBtn === true &&
                           <div className="col-sm-6">
                           {statusCheckBtn === "1" &&
                             <button className="btn btn-danger" data-status={statusCheckBtn} onClick={handleStatus}>UNPUBLISH</button>

                           }

                            {statusCheckBtn === "0" &&
                              <button className="btn btn-success" data-status={statusCheckBtn} onClick={handleStatus}>PUBLISH</button>
                            }
                           </div>
                          }
                          <div className="col-sm-6">
                          {updateBtn === true &&
                            <button className="btn btn-primary float-right" onClick={updateArticleList}>
                              UPDATE 
                              {updateFlag === true &&
                                <i className="fa fa-spinner fa-spin" style={{marginLeft : "5px"}}></i>
                              }
                            </button>
                          }
                          </div>

                          
                          </div>
                          </div>

                        </div>

                      }

                    </div>

                  </div>
                }



              </div>

            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
