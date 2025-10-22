import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { appConfig } from '@shopgate/engage';
import { getCurrentRouteHelper as getCurrentRoute } from '@shopgate/engage/core/helpers';
import {
  getClientInformation,
  isIos,
} from '@shopgate/engage/core/selectors';
import { openPageExtern } from '@shopgate/engage/core/commands';
import { Link, Button, I18n } from '@shopgate/engage/components';
import { IS_PAGE_PREVIEW_ACTIVE } from '@shopgate/engage/page/constants';
import { getUserEmail } from '@shopgate/engage/user';
import styles from './style';
import getConfig from '../../helpers/getConfig';

const {
  enableMaintenanceMode,
  testUser,
  customHeadline,
  customMessage,
  iosAppVersions,
  iosLink,
  iosButtonText,
  androidAppVersions,
  androidLink,
  androidButtonText,
  images,
  showShopLogo,
  startDate,
  endDate,
  maintenancePagesWhitelist,
} = getConfig();

/**
 * MaintenanceMode component.
 */
class MaintenanceMode extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    currentRoute: PropTypes.shape(),
    isIosDevice: PropTypes.bool,
    userEmail: PropTypes.string,
  };

  static defaultProps = {
    appVersion: null,
    currentRoute: null,
    isIosDevice: null,
    userEmail: null,
  };

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.handleTouchTimeout = undefined;
    this.state = {
      showMaintenanceMode: true,
    };
  }

  /**
   * Handles touch start action.
   */
  handleTouchStart = () => {
    this.handleTouchTimeout = setTimeout(() => {
      this.setState({
        showMaintenanceMode: false,
      });
    }, 5000);
  };

  /**
   * Handles touch end action.
   */
  handleTouchEnd = () => {
    clearTimeout(this.handleTouchTimeout);
  };

  /**
   * Checks if the app version is blocked.
   * @param {string} appVersion App version
   * @returns {boolean}
   */
  appVersionIsBlocked = (appVersion) => {
    const appVersions = this.props.isIosDevice ? iosAppVersions : androidAppVersions;

    // Block all versions
    if (!appVersions.length) {
      return true;
    }

    return appVersions.includes(appVersion);
  };

  /**
   * Checks Dates.
   * @returns {boolean}
   */
  checkDate = () => {
    const parseStartDate = startDate.replaceAll('/', '-').replace(' - ', 'T');
    const parseEndDate = endDate.replaceAll('/', '-').replace(' - ', 'T');

    const now = new Date();

    if (!startDate && !endDate) {
      // no times provide. so its always valid
      return true;
    }

    if (!startDate) {
      // no start date given. only check valid end date
      return new Date(parseEndDate) > now;
    }

    if (!endDate) {
      // no end date given. only check valid start date
      return new Date(parseStartDate) < now;
    }

    return new Date(parseStartDate) < now && new Date(parseEndDate) > now;
  };

  /**
  * Checks if there is a page whitelist and only enables maintenance for these pages.
  * @param {Object} currentRoute App version
  * @returns {boolean}
  */
  pageWhitelistStatus = currentRoute => maintenancePagesWhitelist
    .findIndex(element => currentRoute.pattern.includes(element)) >= 0 ||
    maintenancePagesWhitelist.length === 0;

  /**
  * Renders.
  * @returns {JSX}
  */
  render() {
    const {
      userEmail, appVersion, currentRoute, isIosDevice,
    } = this.props;

    const maintenanceInfo = (images && images.length) ?
      (
        <div className={styles.background}>
          <div className={styles.imageContainer}>
            {showShopLogo && (<img
              className={styles.image}
              src={appConfig.logo}
              alt={appConfig.shopName}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
            />)}
            {images.map(({ imageSource, imageHref }) => (
              <button type="button" onClick={() => openPageExtern({ src: imageHref })}>
                <img className={styles.image} src={imageSource} alt={appConfig.shopName} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.background}>
          <div className={styles.container}>
            {showShopLogo &&
              (<img className={styles.image} src={appConfig.logo} alt={appConfig.shopName} />)
            }
            <h3 onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
              {customHeadline || <I18n.Text string="maintenanceMode.headline.text" />}
            </h3>
            {customMessage || <I18n.Text string="maintenanceMode.message.text" />}
            {(!isIosDevice && androidLink) && (
              <Link className={styles.linkButton} href={androidLink} state={{ target: '_blank' }}>
                <Button>{androidButtonText}</Button>
              </Link>
            )}
            {(isIosDevice && iosLink) && (
              <Link className={styles.linkButton} href={iosLink} state={{ target: '_blank' }}>
                <Button>{iosButtonText}</Button>
              </Link>
            )}
          </div>
        </div>
      );
    if (
      !IS_PAGE_PREVIEW_ACTIVE &&
      enableMaintenanceMode &&
      this.pageWhitelistStatus(currentRoute) &&
      !testUser.includes(userEmail) &&
      this.state.showMaintenanceMode &&
      this.appVersionIsBlocked(appVersion) &&
      this.checkDate()
    ) {
      return maintenanceInfo;
    }
    return null;
  }
}

/**
 * @param {Object} state The current application state
 * @return {string}
 */
const mapStateToProps = state => ({
  appVersion: getClientInformation(state).appVersion,
  currentRoute: getCurrentRoute(state),
  isIosDevice: isIos(state),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps)(MaintenanceMode);
