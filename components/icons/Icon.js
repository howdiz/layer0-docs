import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'
import SpartacusIcon from './spartacus-blue.png'
import NextIcon from './next.svg'
import NextCommerceIcon from './next-commerce.svg'
import NuxtIcon from './nuxt.svg'
import ReactStorefrontIcon from './react-storefront.svg'
import SapperIcon from './sapper.svg'
import GatsbyIcon from './gatsby.svg'
import VSFIcon from './vsf.svg'
import NXIcon from './nx.png'
import FrontityIcon from './frontity.svg'
import HTMLIcon from './html.svg'
import Fastboot from './fastboot.svg'
import Razzle from './razzle.svg'

export const icons = {
  react: ReactIcon,
  vue: VueIcon,
  angular: AngularIcon,
  spartacus: ({ classes, ...others }) => (
    <img className={classes && classes.png} {...others} src={SpartacusIcon} />
  ),
  nextjs: NextIcon,
  'next-commerce': NextCommerceIcon,
  nuxt: NuxtIcon,
  prev: ChevronLeft,
  next: ChevronRight,
  'react-storefront': ReactStorefrontIcon,
  sapper: SapperIcon,
  gatsby: GatsbyIcon,
  vsf: VSFIcon,
  nx: NXIcon,
  frontity: FrontityIcon,
  html: HTMLIcon,
  fastboot: Fastboot,
  razzle: Razzle,
}

export const styles = theme => ({
  root: {
    height: 20,
    width: 20,
  },
  png: {
    marginRight: 4,
    height: 20,
    width: 20,
  },
})

const useStyles = makeStyles(styles, { name: 'RSFIcon' })

export default function Icon({ style, classes, type }) {
  classes = useStyles({ classes })
  const El = icons[type]

  if (!El) {
    return null
  } else if (typeof El === 'string') {
    return <img style={style} src={El} className={classes.root} />
  } else {
    return <El style={style} className={classes.root} classes={classes} />
  }
}
