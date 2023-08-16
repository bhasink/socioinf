import { useState, useEffect } from 'react';

// import { Link, Spinner } from 'components';
// import { Layout } from 'components/users';
import { userService } from 'services';


export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [postCaption, setPostCaption] = useState("");
    const [isSharingPost, setIsSharingPost] = useState(false);
    const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    useEffect(() => {

        if (typeof window === "undefined"){
            return null
        }
        
        window.FB.getLoginStatus((response) => {
          setFacebookUserAccessToken(response.authResponse?.accessToken);
        });
      }, []);


      const logInToFB = () => {
        window.FB.login(
          (response) => {
            setFacebookUserAccessToken(response.authResponse?.accessToken);
          },
          {
            // Scopes that allow us to publish content to Instagram
            scope: "pages_show_list,pages_read_user_content,pages_read_engagement,instagram_basic,read_insights,instagram_manage_insights",
          }
        );
      };
    
      const logOutOfFB = () => {
        window.FB.logout(() => {
          setFacebookUserAccessToken(undefined);
        });
      };
    
      /* --------------------------------------------------------
       *             INSTAGRAM AND FACEBOOK GRAPH APIs
       * --------------------------------------------------------
       */
    
      const getFacebookPages = () => {
        return new Promise((resolve) => {
          window.FB.api(
            "me/accounts",
            { access_token: facebookUserAccessToken },
            (response) => {
              resolve(response.data);
            }
          );
        });
      };
    
      const getInstagramAccountId = (facebookPageId) => {
        return new Promise((resolve) => {
          window.FB.api(
            facebookPageId,
            {
              access_token: facebookUserAccessToken,
              fields: "instagram_business_account",
            },
            (response) => {
              resolve(response.instagram_business_account.id);
            }
          );
        });
      };
    
      const createMediaObjectContainer = (instagramAccountId) => {
        return new Promise((resolve) => {
          window.FB.api(
            `${instagramAccountId}/media`,
            "POST",
            {
              access_token: facebookUserAccessToken,
              image_url: imageUrl,
              caption: postCaption,
            },
            (response) => {
              resolve(response.id);
            }
          );
        });
      };
    
      const publishMediaObjectContainer = (
        instagramAccountId,
        mediaObjectContainerId
      ) => {
        return new Promise((resolve) => {
          window.FB.api(
            `${instagramAccountId}/media_publish`,
            "POST",
            {
              access_token: facebookUserAccessToken,
              creation_id: mediaObjectContainerId,
            },
            (response) => {
              resolve(response.id);
            }
          );
        });
      };
    
      const shareInstagramPost = async () => {
        setIsSharingPost(true);
        const facebookPages = await getFacebookPages();
        const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
        const mediaObjectContainerId = await createMediaObjectContainer(
          instagramAccountId
        );
    
        await publishMediaObjectContainer(
          instagramAccountId,
          mediaObjectContainerId
        );
    
        setIsSharingPost(false);
    
        // Reset the form state
        setImageUrl("");
        setPostCaption("");
      };

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
      <>
      
  <section className="mainadminlayer">
    <header className="site-header topmain mobexheight norm">

      <nav className="admnavs">
        <div className="hdlgos">
          <a href="#"><img src="./images/adlog.png" /></a>
        </div>
        <ul>
          <li data-toggle="tooltip" data-placement="right" title="Campaign"><a href="admin-campaign.html"><i className="fas fa-megaphone" /></a></li>
          <li data-toggle="tooltip" data-placement="right" title="Lists"><a href="influencers-list.html"><i className="fas fa-th-list" /></a></li>
          <li data-toggle="tooltip" data-placement="right" title="Campaign Metrics"><a href="campaign-metrics.html"><i className="fas fa-chart-pie" /></a></li>
          <li data-toggle="tooltip" data-placement="right" title="Messages"><a href="#"><i className="fas fa-envelope" /></a></li>
          <li data-toggle="tooltip" data-placement="right" title="Influencers"><a href="audiencedemographic.html"><i className="fad fa-users" /></a></li>
        </ul>
      </nav>
      <div className="logbotms">
        <div className="usnmshots">
          <p>AY</p>
        </div>
        <div className="otplanls">
          <ul>
            <li><a href="account-settings.html"><i className="far fa-cog" /> Account Settings</a></li>
            <li><a href="#"><i className="far fa-sign-out-alt" /> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
    <div className="panelmainlayer">
      <div className="headbluecustom">
        <div className="leftoptionsad">
          <p className="menusubject">Monitor </p>
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Myntra Stylecast
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#">Myntra Stylecast</a>
            <a className="dropdown-item" href="#">Another action</a>
          </div>
        </div>
        <div className="rightsoptionsad">
          <p>8406 matches</p>
          <a href="#" className="transctsa">+ Add to</a>
          <button className="whtscts">Pause</button>
        </div>
      </div>
      <div className="campaignfromlvs contentadlayers">
        <div className="midlys">
          <div className="profviews">
            <div className="row">
              <div className="col-md-4 text-center align-self-center">
                <p className="lcm">Korea, Republic of</p>
                <small>Location</small>
              </div>
              <div className="col-md-4 text-center align-self-center">
                <div className="midprom">
                  <img src="./images/ajeet.jpg" />
                </div>
              </div>
              <div className="col-md-4  align-self-center prml">
                <p>The Explorer</p>
                <p>Yka</p>
                <p>aky78@yb.com</p>
              </div>
            </div>
          </div>
          <div className="whitpatchs">
            <div className="mddtgraphs">
              <div className="row">
                <div className="col-md-4 text-center align-self-center">
                  <p className="dtstats">91%</p>
                  <p>Real</p>
                </div>
                <div className="col-md-4 text-center align-self-center">
                  <div className="grlines">
                    <div className="dtssets">
                      <label>In</label>
                      <div className="gp">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: '77%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                        </div>					
                      </div>
                      <label>77%</label>
                    </div>
                    <div className="dtssets">
                      <label>US</label>
                      <div className="gp">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: '58%'}} aria-valuenow={58} aria-valuemin={0} aria-valuemax={100} />
                        </div>					
                      </div>
                      <label>58%</label>
                    </div>
                  </div>
                  <div className="grpinfos">Countries</div>
                </div>
                <div className="col-md-4 text-center align-self-center">
                  <div className="grlines">
                    <div className="dtssets">
                      <label>0-17</label>
                      <div className="gp">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: '60%'}} aria-valuenow={58} aria-valuemin={0} aria-valuemax={100} />
                        </div>					
                      </div>
                      <label>7%</label>
                    </div>
                    <div className="dtssets">
                      <label>18-20</label>
                      <div className="gp">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: '40%'}} aria-valuenow={58} aria-valuemin={0} aria-valuemax={100} />
                        </div>					
                      </div>
                      <label>9%</label>
                    </div>
                  </div>
                  <div className="grpinfos">Age</div>
                </div>
              </div>
            </div>
          </div>
          <div className>
            <div className="themetableadms">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sn.</th>
                    <th>Influencers Post Type</th>
                    <th>Total Views</th>
                    <th>Total Comments</th>
                    <th>Campaign Reach</th>
                    <th>Engagement</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody id="myTable">
                  <tr>
                    <td className="collapsed" data-toggle="collapse" data-target="#collapseExample22" aria-expanded="false" aria-controls="collapseExample22">
                      1
                    </td>
                    <td>Instagram Post Title
                    </td>
                    <td>8.4k</td>
                    <td>24k</td>
                    <td>2k</td>
                    <td>75k</td>
                    <td><p className="atcons" /></td>
                    <td>
                      <a href="javascript:void(0);" className="deletabls" data-toggle="modal" data-target="#exampleModalCenterdele1"><img src="./images/partners/deletables.png" /></a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Facebook Post Title
                    </td>
                    <td>6.4k</td>
                    <td>14k</td>
                    <td>3k</td>
                    <td>45k</td>
                    <td><p className="inactcons" /></td>
                    <td>
                      <a href="javascript:void(0);" className="deletabls" data-toggle="modal" data-target="#exampleModalCenterdele1"><img src="./images/partners/deletables.png" /></a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Vimeos Post Title
                    </td>
                    <td>12.4k</td>
                    <td>44k</td>
                    <td>1k</td>
                    <td>30k</td>
                    <td><p className="inactcons" /></td>
                    <td>
                      <a href="javascript:void(0);" className="deletabls" data-toggle="modal" data-target="#exampleModalCenterdele1"><img src="./images/partners/deletables.png" /></a>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Linkedin Post Title

                    <section className="app-section">
          {facebookUserAccessToken ? (
            <button onClick={logOutOfFB} className="btn action-btn">
              Logout
            </button>
          ) : (
            <button onClick={logInToFB} className="btn action-btn">
              Login
            </button>
          )}
        </section>
        {facebookUserAccessToken ? facebookUserAccessToken : null}

                    </td>
                    <td>5k</td>
                    <td>2k</td>
                    <td>800</td>
                    <td>80k</td>
                    <td><p className="atcons" /></td>
                    <td>
                      <a href="javascript:void(0);" className="deletabls" data-toggle="modal" data-target="#exampleModalCenterdele1"><img src="./images/partners/deletables.png" /></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  
  <div className="modal fade" id="exampleModalCenterdele1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitledele1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered  delemodsa" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div className="delrecds">
            <h5>Are you Sure You want to delete this Records ?</h5>
            <button type="button" className="orangectadms" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalCenterdele2">Yes</button>
            <button type="button" className="transctmods" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModalCenterdele2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitledele2" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered  delemodsa" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div className="delrecds">
            <h5>Record Deleted Sucessfully</h5>
            <button type="button" className="orangectadms" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>



 
      </>
    );
}
