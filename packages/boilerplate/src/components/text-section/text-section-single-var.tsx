/**
 * Component variation
 *
 * Component type: textSection
 * Variation: Single
 *
 */

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import React, { Fragment } from 'react'
import { enlargingImageStyle } from '../../styles/enlarging-image'
import {
  getAllPaddingObject,
  getSinglePadding,
} from '../../styles/global-padding'
import {
  heading1Style,
  heading2Style,
  heading3Style,
  heading4Style,
} from '../../styles/heading'
import { paragraph1Style } from '../../styles/paragraph'
import { ALink } from '../../views/core-elements/a-link'
import { GLink } from '../../views/core-elements/g-link'
import { Box, Flex } from '../../views/core-elements/grid'
import { Heading } from '../../views/core-elements/heading'
import { Text } from '../../views/core-elements/text'
import { FluidImage, Image } from '../../views/image/image'
import { TextSectionProps } from './text-section'

type Node = any
type Children = any

const ImageBox = (props: { image: FluidImage }) => (
  <Fragment>
    <Box
      ncss={{
        h: [2, 3, 4, 5],
        overflow: 'hidden',
        ...getAllPaddingObject('image'),
        w: 1,
      }}
    >
      <Image
        image={props.image}
        objectFit="cover"
        height="100%"
        {...enlargingImageStyle}
      />
    </Box>
  </Fragment>
)

const TextBox = (props: { children: any }) => (
  <Box
    ncss={{
      px: getSinglePadding('section', 'left'),
      w: [1, 1, 1 / 2, 1 / 2],
    }}
  >
    {props.children}
  </Box>
)
const HeadingBox = (props: { children: any }) => (
  <Box
    ncss={{
      px: getSinglePadding('section', 'left'),
      w: [1],
    }}
  >
    {props.children}
  </Box>
)

const ListBox = (props: { children: any }) => (
  <TextBox>
    <Flex
      ncss={{
        ...paragraph1Style,
        w: 1,
      }}
      children={props.children}
    />
  </TextBox>
)

const ListItemBox = (props: { node: any; locale: string }) => {
  const base = props.node.content[0]
  let text = ''
  let uri
  let internalPath
  if (base.content.length > 1) {
    text = base.content[1].content[0].value
    if ('target' in base.content[1].data) {
      if ('path' in base.content[1].data.target.fields) {
        internalPath = base.content[1].data.target.fields.path[props.locale]
      } else {
        // Someone linked to something else than a page, ignore this
        internalPath = '/'
      }
    } else {
      uri = base.content[1].data.uri
    }
  } else {
    text = base.content[0].value
  }
  const showAsLink = uri || internalPath
  const innerItem = (
    <Flex
      ncss={{
        cursor: showAsLink ? 'pointer' : 'initial',
        ...getAllPaddingObject('listItem'),
        w: 1,
      }}
    >
      {text}
    </Flex>
  )
  const linkStyle = {
    display: 'block',
    py: 1,
    w: 1,
  }
  if (internalPath) {
    return (
      <GLink to={internalPath} ncss={linkStyle}>
        {innerItem}
      </GLink>
    )
  }
  return (
    <ALink href={uri} ncss={linkStyle}>
      {innerItem}
    </ALink>
  )
}

export const TextSectionSingleVar = (props: TextSectionProps) => {
  const regularLinkStyle = {
    '&:hover': {
      textDecoration: 'underline',
    },
    color: 'orange',
    textDecoration: 'none',
  }
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: Children) => {
        return (
          <TextBox>
            <Text ncss={paragraph1Style} children={children} />
          </TextBox>
        )
      },
      [INLINES.HYPERLINK]: (node: Node, children: Children) => {
        const uri = node.data.uri
        return (
          <ALink href={uri} ncss={regularLinkStyle}>
            {children}
          </ALink>
        )
      },
      [INLINES.ENTRY_HYPERLINK]: (node: Node, children: Children) => {
        const internalPath = node.data.target.fields.path[props.locale]
        return (
          <GLink ncss={regularLinkStyle} to={internalPath}>
            {children}
          </GLink>
        )
      },
      [BLOCKS.OL_LIST]: (node: Node, children: Children) => {
        return <ListBox>{children}</ListBox>
      },
      [BLOCKS.UL_LIST]: (node: Node, children: Children) => {
        return <ListBox>{children}</ListBox>
      },
      [BLOCKS.LIST_ITEM]: (node: Node, children: Children) => {
        return <ListItemBox node={node} locale={props.locale} />
      },
      [BLOCKS.HEADING_1]: (node: Node, children: Children) => (
        <HeadingBox>
          <Heading children={children} ncss={heading1Style} />
        </HeadingBox>
      ),
      [BLOCKS.HEADING_2]: (node: Node, children: Children) => (
        <HeadingBox>
          <Heading children={children} ncss={heading2Style} />
        </HeadingBox>
      ),
      [BLOCKS.HEADING_3]: (node: Node, children: Children) => (
        <HeadingBox>
          <Heading children={children} ncss={heading3Style} />
        </HeadingBox>
      ),
      [BLOCKS.HEADING_4]: (node: Node, children: Children) => (
        <HeadingBox>
          <Heading children={children} ncss={heading4Style} />
        </HeadingBox>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const fields = node.data.target.fields
        const image = {
          description: fields.title[props.locale],
          fluid: {
            src: fields.file[props.locale].url + '?w=1024&q=50',
          },
        } as FluidImage
        return <ImageBox image={image} />
      },
    },
  } as Options

  return (
    <Fragment>
      <Flex>{documentToReactComponents(props.text.json, options)}</Flex>
    </Fragment>
  )
}
