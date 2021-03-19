import React from 'react';
import TabularSalesReportList from ".TabularSalesReportList";
import Constants from "../Constants";



export default class Login extends React.Component{
    const mapStateToProps = (state) => ({
        saleConnReports: state.saleConnReports,
        userInfo: state.userInfo,
        userDetailsReports: state.userDetailsReports,
      });
      
      const mapDispatchToProps = (dispatch) => {
        return {
          getSalesReportOpp: bindActionCreators(getSalesReportOpp, dispatch),
          getUserDetailsReportOpp: bindActionCreators(getUserDetailsReportOpp, dispatch),
          // dispatch
        };
      };
      
      class SalesReportOpp extends Component {
        constructor(props) {
          super(props);
          this.state = {
            filterDate: {
              startDate: props.location.state.startDate,
              endDate: props.location.state.endDate,
            },
            userBreadCrumbList: [],
          };
        }
      
        componentDidMount() {
          const { userInfo } = this.props;
          if (userInfo && this.state.filterDate) {
            this.props.getSalesReportOpp(userInfo.id, this.state.filterDate);
            this.setState((state) => {
              const userBreadCrumbList = [
                ...state.userBreadCrumbList,
                { name: "self", id: userInfo.id },
              ];
              return {
                userBreadCrumbList,
              };
            });
          }
        }
      
        componentDidUpdate(prevProps) {
          const { userInfo } = this.props;
          if (prevProps.userInfo !== userInfo && userInfo) {
            this.props.getSalesReportOpp(userInfo.id, this.state.filterDate);
          }
          if (this.state.userBreadCrumbList.length < 1 && userInfo) {
            this.setState((state) => {
              const userBreadCrumbList = [
                ...state.userBreadCrumbList,
                { name: "self", id: userInfo.id },
              ];
              return {
                userBreadCrumbList,
              };
            });
          }
        }
      
        agentDetail = (agentID, agentName) => {
          let breadCrumbList = this.state.userBreadCrumbList;
          if (this.state.filterDate) {
            this.props.getUserDetailsReportOpp(agentID, this.state.filterDate);
          }
          const checkUserId = (obj) => obj.id === agentID;
          if (!breadCrumbList.some(checkUserId)) {
            this.setState((state) => {
              const userBreadCrumbList = [
                ...state.userBreadCrumbList,
                { name: agentName, id: agentID },
              ];
              return {
                userBreadCrumbList,
              };
            });
          }
        };
      
        handleChangeStart = (event, date) => {
          const { userInfo } = this.props;
          let { startDate } = this.state.filterDate.startDate;
          if (startDate !== date) {
            this.setState({
              startDate: date,
            });
            this.props.getSalesReportOpp(userInfo.id, this.state.filterDate);
          }
        };
      
        handleChangeEnd = (event, date) => {
          const { userInfo } = this.props;
          let { endDate } = this.state.filterDate.endDate;
          if (endDate !== date) {
            this.setState({
              endDate: date,
            });
            this.props.getSalesReportOpp(userInfo.id, this.state.filterDate);
          }
        };
      
        resetFilter = () => {
          const today = new Date();
          const { userInfo } = this.props;
          this.setState({
            filterDate: { startDate: today, endDate: today },
          });
          this.props.getSalesReportOpp(userInfo.id, this.state.filterDate);
        };
      
        onBreadcrumbClick = (userID, userName, i) => {
          let bdcList = this.state.userBreadCrumbList;
          let newList = bdcList.filter((item, index) => index <= i);
          this.setState({ userBreadCrumbList: newList });
          if (userName === "self") {
            this.props.getSalesReportOpp(userID, this.state.filterDate);
          } else {
            this.props.getUserDetailsReportOpp(userID, this.state.filterDate);
          }
        };
      
        getBreadCrumbToRender = () => {
          if (this.state.userBreadCrumbList.length > 1) {
            return (
              <div className="salesReport_userBreadcrumb">
                <ul>
                  {this.state.userBreadCrumbList.map((user, index) => {
                    return (
                      <li
                        key={`${user.id}_${index}`}
                        onClick={() => this.onBreadcrumbClick(user.id, user.name, index)}
                      >
                        <a>{user.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          } else return null;
        };

    render(){
        const columns = Constants.salesReportsColumns
          const data = [
            {
              agentId: 10222110,
              agentName: "Ritesh Kumar",
              agentCity: "Ahmedabad",
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "RBH",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 10222107,
              agentName: "Prakash Singhal",
              agentCity: "Gurgaon",
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "CH",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 10388129,
              agentName: "Anu Ranjan Kumar",
              agentCity: "Noida",
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "SAM",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 1214986,
              agentName: "Bishwanath Hazra",
              agentCity: null,
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "AH",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 7814742,
              agentName: "Amit Bhasin",
              agentCity: "Mumbai",
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "Key Accounts Manager",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 16608626,
              agentName: "Aditya Mehandiratta",
              agentCity: null,
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "Housing Owner Head",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 8321540,
              agentName: "Amit Masaldan",
              agentCity: "Noida",
              assignedOpportunities: 0,
              numberOfUniqueAccounts: 0,
              agentDesignation: "NSH",
              coldAccountsData: null,
              warmAccountsData: null,
              hotAccountsData: null,
              closedAccountsData: null,
            },
            {
              agentId: 14420485,
              agentName: "Bhavana Shah",
              agentCity: null,
              assignedOpportunities: 31,
              numberOfUniqueAccounts: 30,
              agentDesignation: "SAM",
              coldAccountsData: null,
              warmAccountsData: {
                numberOfAccounts: 3,
                dealValue: 0.0,
              },
              hotAccountsData: {
                numberOfAccounts: 26,
                dealValue: 22100.0,
              },
              closedAccountsData: {
                numberOfAccounts: 1,
                dealValue: 51000.0,
              },
            },
          ];
        return(
            <React.Fragment>
             <div className="home">
                <div className="salesReport-content">
                    {data && (
                    <TabularSalesReportList
                    columns={columns}
                    data={data}
                    agentDetail={this.agentDetail}
                    />
                    )}
                </div>
            </div>
            </React.Fragment>
        )
    }
}