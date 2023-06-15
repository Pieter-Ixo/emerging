import { getAdditionalInfo } from "@/utils/apiHelper";
import { getServiceEndpoint } from "@/utils/did";

/**
 * Helper function to get entities tags and profile details and flatten into entity object
 */
const getEntityData = async (entity: any, fetchDetails = false) => {
    // No external API to call - data is on the entity structure and only needs to be formatted
    const assetDashboard = entity.linkedResource.find((r: any) =>
        r.id.includes("#asset-dashboard")
    )?.serviceEndpoint;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const assetId = assetDashboard?.substring((assetDashboard?.indexOf("=") + 1));

    // External API calls that may cause rate limit issues and should only be used for single entities
    if (fetchDetails) {
        const [profile, tags, token, page] = await Promise.all([
            entity?.settings?.Profile?.serviceEndpoint
                ? getAdditionalInfo(
                    getServiceEndpoint(
                        entity.settings.Profile.serviceEndpoint,
                        entity.service
                    )
                )
                : null,
            entity?.settings?.Tags?.serviceEndpoint
                ? getAdditionalInfo(
                    getServiceEndpoint(
                        entity.settings.Tags.serviceEndpoint,
                        entity.service
                    )
                )
                : null,
            getAdditionalInfo(
                getServiceEndpoint(
                    entity.linkedResource.find((r: any) => r.id.includes("#token"))
                        .serviceEndpoint,
                    entity.service
                )
            ) as any,
            entity?.settings?.Page?.serviceEndpoint
                ? getAdditionalInfo(
                    getServiceEndpoint(
                        entity.settings.Page.serviceEndpoint,
                        entity.service
                    )
                )
                : null,
        ]);

        return {
            ...entity,
            details: profile,
            tagDetails: tags,
            token: token?.properties?.denom,
            page,
            assetId,
        };
    }
    return {
        ...entity,
        details: null,
        tagDetails: null,
        token: null,
        page: null,
        assetId
    };

};

export default getEntityData