using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEndApp.Models;

public partial class BseguraDbContext : DbContext
{
    public BseguraDbContext()
    {
    }

    public BseguraDbContext(DbContextOptions<BseguraDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC070056D63B");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
