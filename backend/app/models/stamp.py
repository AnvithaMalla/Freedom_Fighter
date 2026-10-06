from datetime import date

from sqlalchemy import (
    Boolean,
    Date,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class StampCountry(Base):
    __tablename__ = "stamp_countries"

    country_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    country_name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    country_code: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    stamps = relationship(
        "Stamp",
        back_populates="country",
    )


class Stamp(Base):
    __tablename__ = "stamps"

    stamp_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    stamp_number: Mapped[str | None] = mapped_column(
        String(50),
        unique=True,
        nullable=True,
    )

    subject_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    country_id: Mapped[int] = mapped_column(
        ForeignKey("stamp_countries.country_id"),
        nullable=False,
    )

    catalogue_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    release_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    release_year: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    denomination: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    issue_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    purpose_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    image_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_currently_valid: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    country = relationship(
        "StampCountry",
        back_populates="stamps",
    )

    translations = relationship(
        "StampTranslation",
        back_populates="stamp",
        cascade="all, delete-orphan",
    )


class StampTranslation(Base):
    __tablename__ = "stamp_translations"

    translation_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    stamp_id: Mapped[int] = mapped_column(
        ForeignKey("stamps.stamp_id", ondelete="CASCADE"),
        nullable=False,
    )

    language_code: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
    )

    title: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    historical_significance: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    original_usage: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    current_status: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    stamp = relationship(
        "Stamp",
        back_populates="translations",
    )