"""
@author: Crystian
@title: Crystools
@nickname: Crystools
@project: "https://github.com/crystian/ComfyUI-Crystools",
@description: Plugins for multiples uses, mainly for debugging, you need them! IG: https://www.instagram.com/crystian.ia
"""

from .nodes._names import CLASSES
from .nodes.primitive import CBoolean, CText, CTextML, CInteger, CFloat
from .nodes.switch import CSwitchBooleanAny, CSwitchBooleanLatent, CSwitchBooleanConditioning, CSwitchBooleanImage, \
    CSwitchBooleanString
from .nodes.debugger import CConsoleAny
from .nodes.image import CImagePreviewAdvance, CImageLoadWithMetadata, CImageShowResolution
from .nodes.list import CListAny, CListString
from .nodes.pipe import CPipeToAny, CPipeFromAny
from .nodes.utils import CUtilsCompareJsons, CUtilsStatSystem, CMetadataExtractor, CMetadataCompare

NODE_CLASS_MAPPINGS = {
    CLASSES.CBOOLEAN_NAME.value: CBoolean,
    CLASSES.CTEXT_NAME.value: CText,
    CLASSES.CTEXTML_NAME.value: CTextML,
    CLASSES.CINTEGER_NAME.value: CInteger,
    CLASSES.CFLOAT_NAME.value: CFloat,

    CLASSES.CCONSOLE_ANY_NAME.value: CConsoleAny,

    CLASSES.CLIST_ANY_NAME.value: CListAny,
    CLASSES.CLIST_STRING_NAME.value: CListString,

    CLASSES.CSWITCH_ANY_NAME.value: CSwitchBooleanAny,
    CLASSES.CSWITCH_LATENT_NAME.value: CSwitchBooleanLatent,
    CLASSES.CSWITCH_CONDITIONING_NAME.value: CSwitchBooleanConditioning,
    CLASSES.CSWITCH_IMAGE_NAME.value: CSwitchBooleanImage,
    CLASSES.CSWITCH_STRING_NAME.value: CSwitchBooleanString,

    CLASSES.CPIPE_TO_ANY_NAME.value: CPipeToAny,
    CLASSES.CPIPE_FROM_ANY_NAME.value: CPipeFromAny,

    CLASSES.CIMAGE_LOAD_METADATA_NAME.value: CImageLoadWithMetadata,
    CLASSES.CIMAGE_SHOW_RESOLUTION_NAME.value: CImageShowResolution,
    CLASSES.CIMAGE_PREVIEW_ADVANCE_NAME.value: CImagePreviewAdvance,

    CLASSES.CUTILS_METADATA_EXTRACTOR_NAME.value: CMetadataExtractor,
    CLASSES.CUTILS_METADATA_COMPARE_NAME.value: CMetadataCompare,
    CLASSES.CUTILS_COMPARE_JSONS_NAME.value: CUtilsCompareJsons,
    CLASSES.CUTILS_STAT_SYSTEM_NAME.value: CUtilsStatSystem
}

NODE_DISPLAY_NAME_MAPPINGS = {
    CLASSES.CBOOLEAN_NAME.value: CLASSES.CBOOLEAN_DESC.value,
    CLASSES.CTEXT_NAME.value: CLASSES.CTEXT_DESC.value,
    CLASSES.CTEXTML_NAME.value: CLASSES.CTEXTML_DESC.value,
    CLASSES.CINTEGER_NAME.value: CLASSES.CINTEGER_DESC.value,
    CLASSES.CFLOAT_NAME.value: CLASSES.CFLOAT_DESC.value,

    CLASSES.CCONSOLE_ANY_NAME.value: CLASSES.CCONSOLE_ANY_DESC.value,

    CLASSES.CLIST_ANY_NAME.value: CLASSES.CLIST_ANY_DESC.value,
    CLASSES.CLIST_STRING_NAME.value: CLASSES.CLIST_STRING_DESC.value,

    CLASSES.CSWITCH_ANY_NAME.value: CLASSES.CSWITCH_ANY_DESC.value,
    CLASSES.CSWITCH_LATENT_NAME.value: CLASSES.CSWITCH_LATENT_DESC.value,
    CLASSES.CSWITCH_CONDITIONING_NAME.value: CLASSES.CSWITCH_CONDITIONING_DESC.value,
    CLASSES.CSWITCH_IMAGE_NAME.value: CLASSES.CSWITCH_IMAGE_DESC.value,
    CLASSES.CSWITCH_STRING_NAME.value: CLASSES.CSWITCH_STRING_DESC.value,

    CLASSES.CPIPE_TO_ANY_NAME.value: CLASSES.CPIPE_TO_ANY_DESC.value,
    CLASSES.CPIPE_FROM_ANY_NAME.value: CLASSES.CPIPE_FROM_ANY_DESC.value,

    CLASSES.CIMAGE_LOAD_METADATA_NAME.value: CLASSES.CIMAGE_LOAD_METADATA_DESC.value,
    CLASSES.CIMAGE_SHOW_RESOLUTION_NAME.value: CLASSES.CIMAGE_SHOW_RESOLUTION_DESC.value,
    CLASSES.CIMAGE_PREVIEW_ADVANCE_NAME.value: CLASSES.CIMAGE_PREVIEW_ADVANCE_DESC.value,

    CLASSES.CUTILS_METADATA_EXTRACTOR_NAME.value: CLASSES.CUTILS_METADATA_EXTRACTOR_DESC.value,
    CLASSES.CUTILS_METADATA_COMPARE_NAME.value: CLASSES.CUTILS_METADATA_COMPARE_DESC.value,
    CLASSES.CUTILS_COMPARE_JSONS_NAME.value: CLASSES.CUTILS_COMPARE_JSONS_DESC.value,
    CLASSES.CUTILS_STAT_SYSTEM_NAME.value: CLASSES.CUTILS_STAT_SYSTEM_DESC.value,
}

WEB_DIRECTORY = "./web"
