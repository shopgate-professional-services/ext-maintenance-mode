import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { appConfig } from '@shopgate/engage';
import { getCurrentRouteHelper as getCurrentRoute } from '@shopgate/engage/core/helpers';
import {
  getClientInformation,
  getIsIos,
} from '@shopgate/engage/core/selectors';
import { openPageExtern } from '@shopgate/engage/core/commands';
import { Link, I18n } from '@shopgate/engage/components';
import { Button } from '@shopgate/engage/components/v2';
import { IS_PAGE_PREVIEW_ACTIVE } from '@shopgate/engage/page/constants';
import { getUserEmail } from '@shopgate/engage/user';
import { makeStyles } from '@shopgate/engage/styles';
import getConfig from '../../helpers/getConfig';
import toZonedDate from '../../helpers/toZonedDate';

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
  timezone,
  maintenancePagesWhitelist,
} = getConfig();

const TOUCH_TIMEOUT = 5000;

const useStyles = makeStyles()(theme => ({
  background: {
    background: theme.palette.background.default,
    position: 'fixed',
    zIndex: 5000,
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
  container: {
    position: 'absolute',
    textAlign: 'center',
    top: '25%',
    left: '5%',
    right: '5%',
  },
  imageContainer: {
    position: 'absolute',
    textAlign: 'center',
    top: '5%',
    left: '2%',
    right: '2%',
  },
  image: {
    maxWidth: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  linkButton: {
    width: '100%',
    textAlign: 'center',
    margin: '15px 0',
  },
}));

/**
 * Checks if the app version is blocked.
 * @param {boolean} isIosDevice Whether the current device runs iOS.
 * @param {string} appVersion App version.
 * @returns {boolean}
 */
const appVersionIsBlocked = (isIosDevice, appVersion) => {
  const appVersions = isIosDevice ? iosAppVersions : androidAppVersions;

  // Block all versions
  if (!appVersions.length) {
    return true;
  }

  return appVersions.includes(appVersion);
};

/**
 * Checks Dates.
 * When a `timezone` (IANA name, e.g. "Europe/Berlin") is configured, the
 * start/end wall-clock times are interpreted in that fixed time zone
 * (daylight saving aware). Without it they fall back to the device's local
 * time zone, i.e. the previous behaviour.
 * @returns {boolean}
 */
const checkDate = () => {
  // Convert "YYYY/MM/DD - HH:mm" to a wall-clock ISO-like string "YYYY-MM-DDTHH:mm".
  const parseStartDate = startDate.replaceAll('/', '-').replace(' - ', 'T');
  const parseEndDate = endDate.replaceAll('/', '-').replace(' - ', 'T');

  const now = new Date();

  if (!startDate && !endDate) {
    // no times provided. so it's always valid
    return true;
  }

  if (!startDate) {
    // no start date given. only check valid end date
    return toZonedDate(parseEndDate, timezone) > now;
  }

  if (!endDate) {
    // no end date given. only check valid start date
    return toZonedDate(parseStartDate, timezone) < now;
  }

  return toZonedDate(parseStartDate, timezone) < now &&
    toZonedDate(parseEndDate, timezone) > now;
};

/**
 * Checks if there is a page whitelist and only enables maintenance for these pages.
 * @param {Object} currentRoute Current route.
 * @returns {boolean}
 */
const pageWhitelistStatus = currentRoute => maintenancePagesWhitelist
  .findIndex(element => currentRoute.pattern.includes(element)) >= 0 ||
  maintenancePagesWhitelist.length === 0;

/**
 * MaintenanceMode component.
 * @returns {JSX}
 */
const MaintenanceMode = () => {
  const { classes } = useStyles();
  const [showMaintenanceMode, setShowMaintenanceMode] = useState(true);
  const touchTimeout = useRef();

  const appVersion = useSelector(state => getClientInformation(state).appVersion);
  const currentRoute = useSelector(getCurrentRoute);
  const isIosDevice = useSelector(getIsIos);
  const userEmail = useSelector(getUserEmail);

  const handleTouchStart = useCallback(() => {
    touchTimeout.current = setTimeout(() => setShowMaintenanceMode(false), TOUCH_TIMEOUT);
  }, []);

  const handleTouchEnd = useCallback(() => {
    clearTimeout(touchTimeout.current);
  }, []);

  if (
    IS_PAGE_PREVIEW_ACTIVE ||
    !enableMaintenanceMode ||
    !pageWhitelistStatus(currentRoute) ||
    testUser.includes(userEmail) ||
    !showMaintenanceMode ||
    !appVersionIsBlocked(isIosDevice, appVersion) ||
    !checkDate()
  ) {
    return null;
  }

  if (images && images.length) {
    return (
      <div className={classes.background}>
        <div className={classes.imageContainer}>
          {showShopLogo && appConfig.logo && (
            <img
              className={classes.image}
              src={appConfig.logo}
              alt={appConfig.shopName}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          )}
          {images.map(({ imageSource, imageHref }) => (
            <button
              key={imageSource}
              type="button"
              onClick={() => openPageExtern({ src: imageHref })}
            >
              <img className={classes.image} src={imageSource} alt={appConfig.shopName} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {showShopLogo && appConfig.logo && (
          <img className={classes.image} src={appConfig.logo} alt={appConfig.shopName} />
        )}
        <h3 onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {customHeadline || <I18n.Text string="maintenanceMode.headline.text" />}
        </h3>
        {customMessage || <I18n.Text string="maintenanceMode.message.text" />}
        {(!isIosDevice && androidLink) && (
          <Link className={classes.linkButton} href={androidLink} state={{ target: '_blank' }}>
            <Button color="primary">{androidButtonText}</Button>
          </Link>
        )}
        {(isIosDevice && iosLink) && (
          <Link className={classes.linkButton} href={iosLink} state={{ target: '_blank' }}>
            <Button color="primary">{iosButtonText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MaintenanceMode;
