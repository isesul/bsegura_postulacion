using Microsoft.EntityFrameworkCore.Query;
using BackEndApp.Models;

namespace BackEndApp.Helpers
{
    public static class QueryableHelper
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, Pagination pagination)
        {
            return queryable.Skip((pagination.Page - 1) * pagination.Size).Take(pagination.Size);
        }
    }
}
