using Budget.WillowBear.Filter;

namespace Budget.WillowBear.Services;
public interface IUriService
{
    public Uri GetPageUri(PaginationFilter filter, string route);
}
